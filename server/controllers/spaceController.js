// files
const SpaceModel = require("../models/SpaceModel");
const UserModel = require("../models/UserModel");
const connectDB = require("../config/db");

const getSpaces = async (req, res) => {
  try {
    await connectDB()
    // pagination
    const pageNum = Number(req.query.pageNum) || 1;
    const pageSize = Number(req.query.pageSize) || 1;
    const skip = (pageNum - 1) * pageSize;
    const limit = pageSize;
    const spaces = await SpaceModel.find({})
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const total = await SpaceModel.countDocuments();
    return res.json({
      success: "Found the spaces",
      data: spaces,
      total,
      pageNum,
      pageSize,
    });
  } catch (e) {
    return res.status(500).json({ error: "Could not find spaces", e: e.message});
  }
};

const searchSpaces = async (req, res) => {
  try {
    await connectDB()
    // pagination
    const pageNum = Number(req.query.pageNum) || 1;
    const pageSize = Number(req.query.pageSize) || 1;
    const skip = (pageNum - 1) * pageSize;
    const limit = pageSize;
    // we are searching the Spaces Model
    const spaceQuery = req.query.searchQuery;
    // const spaceQuery = req.query.space || "";
    const regexSpace = new RegExp(spaceQuery, "i");
    const searchedSpaces = await SpaceModel.find({
      spaceName: { $regex: regexSpace },
    })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const total = await SpaceModel.countDocuments({
      spaceName: { $regex: regexSpace },
    });
    return res.status(200).json({
      data: searchedSpaces,
      total,
      pageNum,
      pageSize,
    });
  } catch (e) {
    return res.status(401).json({ error: "Could not load searched spaces", e: e.message });
  }
};

const getSpace = async (req, res) => {
  try {
    await connectDB()
    const { spaceId } = req.params;
    const userId = req?.user?._id;
    const space = await SpaceModel.findById(spaceId);
    return res.status(200).json({
      success: "Found space",
      data: space,
      message: userId ? "In Space" : "Not in Space",
    });
  } catch (e) {
    return res.status(500).json({ error: "Could not find space", e: e.message });
  }
};

const getUserSpaces = async (req, res) => {
  try {
    await connectDB()
    const userId = req.user._id;
    const user = await UserModel.findById(userId);
    const spaces = user.spaces;
    const arr = [];
    if (spaces) {
      spaces.map((space) => {
        arr.push(space.spaceId);
      });
    }
    const userSpaces = await SpaceModel.find({
      _id: {
        $in: [...arr],
      },
    }).select("-posts");

    return res
      .status(200)
      .json({ success: "Found user spaces", data: userSpaces });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Could not get user spaces", e: e.message });
  }
};

const createSpace = async (req, res) => {
  try {
    await connectDB()
    const {
      spaceName,
      category,
      avatar,
      description,
      createdBy,
      userName,
      userId,
    } = req.body;
    const spaceExists = await SpaceModel.find({ spaceName: spaceName });
    if (spaceExists.length > 0) {
      return res.status(500).json({ error: "A space with this name exists" });
    }
    const space = await SpaceModel.create({
      spaceName,
      category,
      avatar,
      description,
      createdBy,
      members: [{ userName, memberId: userId }],
    });
    const user = await UserModel.findById(createdBy);
    user.spaces.push({ spaceName: spaceName, spaceId: space._id });
    await user.save();
    return res
      .status(200)
      .json({ success: "space has been created", data: space });
  } catch (e) {
    return res.status(500).json({ error: "Could not create space" , e: e.message});
  }
};

const checkCreaterofSpace = async (req, res) => {
  try {
    await connectDB()
    const { spaceId } = req.params;
    const userId = req.user._id;
    const space = await SpaceModel.findById(spaceId).select("createdBy");
    if (userId !== space.createdBy.toString()) {
      return res.status(200).json({ data: false });
    } else {
      return res.status(200).json({ data: true });
    }
  } catch (e) {
    return res.status(500).json({ error: "Could not check creator", e: e.message });
  }
};

const editSpace = async (req, res) => {
  try {
    await connectDB()
    const { spaceId } = req.params;
    const userId = req.user._id;
    const space = await SpaceModel.findById(spaceId);
    const { spaceName, category, avatar, description } = req.body;
    space.spaceName = spaceName || space.spaceName;
    space.category = category || space.category;
    space.avatar = avatar || space.avatar;
    space.description = description || space.description;
    await space.save();
    return res.status(200).json({ success: "Space has been updated" });
  } catch (e) {
    return res.status(500).json({ error: "Could not update space", e: e.message });
  }
};
const joinSpace = async (req, res) => {
  try {
    await connectDB()
    const { spaceId } = req.body;
    const userId = req.user._id;
    const userName = req.user.userName;
    const ifisMember = await SpaceModel.findById(spaceId).elemMatch("members", {
      memberId: userId,
      userName: userName,
    });

    if (ifisMember) {
      return res
        .status(500)
        .json({ error: "You are already a member of this space" });
    }
    const spaceToJoin = await SpaceModel.findById(spaceId);
    spaceToJoin.members.push({ memberId: userId, userName });
    await spaceToJoin.save();
    const user = await UserModel.findById(userId);
    user.spaces.push({ spaceName: spaceToJoin.spaceName, spaceId: spaceId });
    await user.save();
    return res
      .status(200)
      .json({ success: "You are now a member of this space", data: member });
  } catch (e) {
    return res.status(500).json({ error: "Could not join this space.", e: e.message });
  }
};

const checkIfUserIsInSpace = async (req, res) => {
  try {
    await connectDB()  
    const { spaceId } = req.params;

    const userId = req.user._id;
    const userName = req.user.userName;

    const ifisMember = await SpaceModel.findById(spaceId).elemMatch("members", {
      memberId: userId,
      userName: userName,
    });
    if (!ifisMember) {
      return res.status(200).json({ data: false });
    }
    return res.status(200).json({ data: true });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ error: "Could not verify if user is in the space", e: e.message });
  }
};
module.exports = {
  getSpaces,
  getSpace,
  searchSpaces,
  getUserSpaces,
  joinSpace,
  checkIfUserIsInSpace,
  createSpace,
  editSpace,
  checkCreaterofSpace,
};
