// files
const {
  hashPassword,
  comparePassword,
} = require("../utils/passwordOperations");
const { generateCookie } = require("../utils/generateCookie");
const UserModel = require("../models/UserModel");
const connectDB = require("../config/db");

const getAllUsers = async (req, res) => {
  try {
    await connectDB()
    const users = await UserModel.find({}).select("-password");
    return res.json(users);
  } catch (e) {
    console.log(e);
    res.status(400).send("Could not get all users");
  }
};

const registerUser = async (req, res) => {
  try {
    await connectDB()
    const userName = req.body?.userName;
    const email = req.body?.email;
    const password = req.body?.password;
    if (!(userName && email && password)) {
      return res.status(400).json({ error: "Please provide all inputs" });
    }
    const user = await UserModel.findOne({ email: email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
    const checkSameUsername = await UserModel.findOne({ userName: userName });
    if (checkSameUsername) {
      return res.status(503).json({
        error: "A user with that username exists. Please pick another username",
      });
    }
    const hashedPassword = hashPassword(password);
    const new_user = await UserModel.create({
      userName: userName,
      email: email,
      password: hashedPassword,
    });
    return res
      .cookie(
        "access_token",
        generateCookie(
          new_user._id,
          new_user.userName,
          new_user.email,
          new_user.isAdmin,
        ),
        { httpOnly: true, secure: true, sameSite: "None" },
      )
      .status(201)
      .json({
        success: "Congratulations!! You have been registered",
        userCreated: {
          _id: new_user._id,
          userName: new_user.userName,
          email: new_user.email,
          isAdmin: new_user.isAdmin,
        },
      });
  } catch (e) {
    res.status(404).json({
      error: "Could not register you at the moment. Please try later",
      e: e.message
    });
  }
};

const loginUser = async (req, res) => {
  try {
    await connectDB()
    const email = req.body?.email;
    const password = req.body?.password;
    const doNotLogOut = req.body?.doNotLogOut;
    if (!email || !password) {
      return res.status(400).json({ error: "All inputs are required" });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(503).json({
        error: "This email is not registered with us. Please register first",
      });
    }

    if (user && comparePassword(password, user.password)) {
      let cookieParams = {
        httpOnly: true,
        secure: true,
        sameSite: "None" 
      };
      if (doNotLogOut) {
        cookieParams = { ...cookieParams, maxAge: 1000 * 60 * 60 * 24 * 7 };
      }
      return res
        .cookie(
          "access_token",
          generateCookie(user._id, user.userName, user.email, user.isAdmin),
          cookieParams,
        )
        .json({
          success: "user logged in",
          userLoggedIn: {
            _id: user._id,
            userName: user.userName,
            email: user.email,
            isAdmin: user.isAdmin,
            doNotLogOut,
          },
        });
    } else {
      return res
        .status(400)
        .json({ error: "Wrong password. Please try again" });
    }
  } catch (e) {
    res.status(401).json({ error: "Could not login user", e: e.message });
  }
};

const saveUserProfile = async (req, res) => {
  try {
    await connectDB()
    const user = await UserModel.findById(req.user._id); // gotten from a custom middleware
    const avatar = req.body?.avatar;
    const firstName = req.body?.firstName;
    const lastName = req.body?.lastName;
    const description = req.body?.description;
    user.avatar = avatar || user.avatar;
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.description = description || user.description;
    await user.save();
    return res.status(200).json({
      userUpdated: {
        _id: user._id,
        isAdmin: user.isAdmin,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (e) {
    console.log(e);
    res
      .status(404)
      .json({ error: "Could not update profile. Please try again later", e: e.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    await connectDB()
    const { id } = req.params;
    const user = await UserModel.findById(id).select("-password");
    return res.status(200).json({ user });
  } catch (e) {
    console.log(e);
    return res
      .status(404)
      .json({ error: "Could not load user profile. Please reload the page", e: e.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await connectDB()
    const { id } = req.params;
    const user = await UserModel.findByIdAndDelete(id);
    res.send("User has been deleted");
  } catch (e) {
    console.log(e);
    res.status(500).send("Could not delete user");
  }
};

const logOutUser = (req, res) => {
  try {
    return res
      .clearCookie("access_token")
      .send("You have been logged out. Come again soon!!!");
  } catch (e) {
    return res.status(500).json({ error: "Could not logout", e: e.message });
  }
};

module.exports = {
  getAllUsers,
  loginUser,
  registerUser,
  saveUserProfile,
  getUserProfile,
  deleteUser,
  logOutUser,
};
