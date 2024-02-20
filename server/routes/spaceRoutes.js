// dependencies
const express = require("express");
// variables
const router = express.Router();
// files
const { verifyIsLoggedIn } = require("../customMiddleware/verifyAuthToken");
const {
  getSpaces,
  getSpace,
  searchSpaces,
  getUserSpaces,
  checkIfUserIsInSpace,
  createSpace,
  joinSpace,
  editSpace,
  checkCreaterofSpace,
} = require("../controllers/spaceController");

const { getPosts, getPost } = require("../controllers/postController");

router.get("/searchspaces", searchSpaces);
router.get("/getspaces", getSpaces);
router.get("/getspaces/:spaceId", getSpace);
router.get("/searchspaces/:spaceId", getSpace);

router.use(verifyIsLoggedIn);

router.get("/user", getUserSpaces);
router.post("/user/createspace", createSpace);
router.put("/user/editspace/:spaceId", editSpace);
router.get("/user/:spaceId", getSpace);
router.get("/isInSpace/:spaceId", checkIfUserIsInSpace);
router.get("/isCreatorofSpace/:spaceId", checkCreaterofSpace);
router.get("/user/:spaceId/posts", getPosts);
router.post("/user/:spaceId/joinspace", joinSpace);
router.get("/user/:spaceId/posts/:postId", getPost);

module.exports = router;
