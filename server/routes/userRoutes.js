// dependencies
const express = require("express");
// variables
const router = express.Router();
// files
const {
  loginUser,
  registerUser,
  getAllUsers,
  saveUserProfile,
  getUserProfile,
  deleteUser,
  logOutUser,
} = require("../controllers/usersController");

const {
  verifyIsLoggedIn,
  verifyIsAdmin,
} = require("../customMiddleware/verifyAuthToken");

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/user/logout", logOutUser);

router.use(verifyIsLoggedIn); // checks for login permissions

router.put("/user", saveUserProfile);
// router.get("/user/logout", logOutUser);
router.get("/user/:id", getUserProfile);

router.use(verifyIsAdmin);

router.get("/", getAllUsers);

module.exports = router;
