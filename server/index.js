// dependencies
require('dotenv').config()
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const { createServer } = require("http");

// files and functions
const connectDB = require("./config/db");
const apiRoutes = require("./routes/apiRoutes");
const SpaceModel = require("./models/SpaceModel");
const PostModel = require("./models/PostModel");
const CommentsModel = require("./models/CommentModel");
// variables
const app = express();
const PORT = 4000;
const whitelist = [
  "https://things-we-like-client.vercel.app",
  "https://things-we-like-client.vercel.app/"
];
const corsoptions = {
  origin: function (origin, callback) {
    if (!origin) {
      return callback(null, true);
    }
    if (whitelist.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      console.log(whitelist.indexOf(origin));
      return callback(new Error("not allowed by cors"));
    }
  },
  credentials: true,
};

app.use(cors(corsoptions));
app.use(express.json());
app.use(cookieParser());
app.use(apiRoutes);
// socket io
const server = require("http").createServer(app);
const io = require("socket.io")(server, { 
  cors: { 
    origin: ["https://things-we-like-client.vercel.app", "https://things-we-like-client.vercel.app/", "http://things-we-like-client.vercel.app", "http://things-we-like-client.vercel.app/"], 
    credentials: true
  }
});

// connect
connectDB();
// listen
server.listen(PORT);

// Socket.IO connections
io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected`);
  const count = io.engine.clientsCount;
  console.log("number of users is", count);
  socket.on("writeComment", async (data) => {
    try {
      await connectDB();
      const postId = data.postId;
      const memberId = data.owner;
      const userName = data.userName;
      const postedAt = new Date();
      const comment = data.comment;
      const newComment = await CommentsModel.create({
        postId,
        comment: comment,
        postedAt: postedAt,
        owner: memberId,
        userName: userName,
      });
      io.emit("comment", newComment);
      
      const post = await PostModel.findById(postId);
      post.comments.push({ owner: memberId, postId: newComment._id });
      await post.save();
    } catch (e) {
      io.emit("commentingError", e.message)
    }
  });
  socket.on("writePostInPosts", async (data) => {
    const count = io.engine.clientsCount;
    console.log("number of users is", count);
    try {
      await connectDB();
      const spaceId = data.spaceId;
      const userId = data.userId;
      const userName = data.userName;

      const ifisMember = await SpaceModel.findById(spaceId).elemMatch(
        "members",
        {
          memberId: userId,
          userName: userName,
        },
      );
      const description = data.description;
      const postedAt = new Date();
      const post = await PostModel.create({
        description,
        postedAt,
        owner: { memberId: userId, userName },
      });
      io.emit("postInPosts", post);
      const save_post = await SpaceModel.findById(spaceId);
      save_post.posts.push({ owner: userId, postId: post._id });
      await save_post.save();
    } catch (e) {
      io.emit("postingError", e.message);
    }
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});
