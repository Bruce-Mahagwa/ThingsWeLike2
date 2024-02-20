// dependencies
const express = require("express");
// variables
const router = express.Router();
// files
const {
  getPosts,
  getPost,
  createComment,
  getPostComments,
  createPost,
} = require("../controllers/postController");
const { verifyIsLoggedIn } = require("../customMiddleware/verifyAuthToken");

router.get("/:spaceId/posts", getPosts);
router.get("/:spaceId/posts/:postId", getPost);
router.get("/:spaceId/posts/:postId/comments", getPostComments);

router.use(verifyIsLoggedIn);

router.post("/:postId/postcomment", createComment);
router.post("/:spaceId/createpost", createPost);

module.exports = router;
