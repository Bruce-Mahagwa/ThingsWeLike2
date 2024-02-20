// files
const PostModel = require("../models/PostModel");
const SpaceModel = require("../models/SpaceModel");
const CommentsModel = require("../models/CommentModel");
const connectDB = require("../config/db");

const getPosts = async (req, res) => {
  try {
    await connectB()
    const { spaceId } = req.params;
    const pageNum = Number(req.query.pageNum) || 1;
    const pageSize = Number(req.query.pageSize) || 3;
    const isRefreshed = req.query.isRefreshed || false;
    const space = await SpaceModel.findById(spaceId);
    const total = space.posts.length;
    let arr = [];
    if (space.posts.length > 0) {
      if (isRefreshed !== "false" && (isRefreshed === "true" || isRefreshed)) {
        // the typeof the query is string
        // here we check if the page has been refreshed in which case we collect all the posts up to the pageNum the client is on
        // for (let i = 0; i < pageNum * pageSize; i++) {
        for (let i = total - 1; i >= total - pageNum * pageSize; i--) {
          const post = space.posts[i] || "";
          if (!post) {
            break;
          }
          const postId = post.postId;
          arr.push(postId);
        }
        console.log("REFRESH 11");
      } else {
        // here we collect posts based on the pageNum and pageSize. It is the default state
        for (
          let j = total - (pageNum - 1) * pageSize - 1;
          j >= total - pageNum * pageSize;
          j--
        ) {
          const post = space.posts[j] || "";
          if (!post) {
            break;
          }
          const postId = post.postId;
          arr.push(postId);
        }
      }
    }
    // console.log(arr);
    const posts = await PostModel.find({
      _id: {
        $in: [...arr],
      },
    }).sort({ postedAt: -1 });
    return res.status(200).json({
      success: "Founder space posts",
      data: posts,
      total,
      pageNum,
      pageSize,
      spaceName: space.spaceName,
    });
  } catch (e) {
    return res.status(500).json({ error: "Could not load posts", e: e });
  }
};

const getPost = async (req, res) => {
  try {
    await connectDB()
    const { postId } = req.params;
    const post = await PostModel.findById(postId);
    return res.status(200).json({ success: "Found post", data: post });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Could not fetch post", e: e });
  }
};

const getPostComments = async (req, res) => {
  try {
    await connectDB()
    const { postId } = req.params;

    const isRefreshed = req.query.isRefreshed || false;
    const pageNum = Number(req.query.pageNum) || 1;
    const pageSize = Number(req.query.pageSize) || 1;
    const posts = await PostModel.findById(postId).select("comments");
    console.log("comments", posts);
    const total = posts.comments.length;
    console.log(isRefreshed, total, pageNum, pageSize);
    let arr = [];
    if (posts.comments.length > 0) {
      if (isRefreshed !== "false" && (isRefreshed === "true" || isRefreshed)) {
        // the typeof the query is string
        // here we check if the page has been refreshed in which case we collect all the comments up to the pageNum the client is on
        for (let i = total - 1; i >= total - pageNum * pageSize; i--) {
          const comment = posts.comments[i] || "";
          if (!comment) {
            break;
          }
          const commentId = comment.postId;
          arr.push(commentId);
        }
      } else {
        // here we collect posts based on the pageNum and pageSize. It is the default state
        // console.log("or am i here in not refees");
        for (
          let j = total - (pageNum - 1) * pageSize - 1;
          j >= total - pageNum * pageSize;
          j--
        ) {
          const comment = posts.comments[j] || "";
          if (!comment) {
            break;
          }
          const commentId = comment.postId;
          arr.push(commentId);
        }
      }
    }
    const comments = await CommentsModel.find({
      _id: {
        $in: [...arr],
      },
    }).sort({ postedAt: -1 });
    console.log(comments, "comments");
    return res.status(200).json({
      success: "Post comments found",
      data: comments,
      total,
      pageNum,
      pageSize,
    });
  } catch (e) {
    return res.status(500).json({ error: "could not find comments", e: e });
  }
};
const createComment = async (req, res) => {
  try {
    await connectDB()
    const { postId } = req.params;
    const memberId = req.user._id;
    const userName = req.user.userName;
    const ifUserMadePost = await PostModel.findById(postId).elemMatch("owner", {
      memberId: memberId,
      userName: userName,
    });
    if (ifUserMadePost) {
      return res
        .status(400)
        .json({ error: "You can't comment on your own post" });
    }
    const postedAt = new Date();
    const { comment } = req.body;
    const newComment = await CommentsModel.create({
      postId,
      comment: comment.description,
      postedAt: postedAt,
      owner: memberId,
      userName: userName,
    });
    const post = await PostModel.findById(postId);
    post.comments.push({ owner: memberId, postId: newComment._id });
    await post.save();
    return res
      .status(200)
      .json({ success: "Comment created", data: newComment });
  } catch (e) {
    return res.status(500).json({ error: "Could not create post", e: e });
  }
};

const createPost = async (req, res) => {
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
      return res
        .status(503)
        .json({ error: "You must join space before posting" });
    }

    const { description } = req.body;
    const postedAt = new Date();
    const post = await PostModel.create({
      description,
      postedAt,
      owner: { memberId: userId, userName },
    });
    const save_post = await SpaceModel.findById(spaceId);
    save_post.posts.push({ owner: userId, postId: post._id });
    await save_post.save();
    return res
      .status(200)
      .json({ success: "You have successfully made a post", data: post });
  } catch (e) {
    return res.status(500).json({ error: "Cannot create post", e: e });
  }
};

module.exports = {
  getPosts,
  getPost,
  createComment,
  getPostComments,
  createPost,
};
