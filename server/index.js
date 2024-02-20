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
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

// middleware
// app.use( 
//   cors({
//     credentials: true,
//     // origin: "https://indiefolkchannel.brucejacob.repl.co",
//     origin: "https://web.postman.co",
//   }),
// );

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

// const io = new Server(httpServer, {
//   allowRequest: (req, callback) => {
//     const noOriginHeader = req.headers.origin === undefined;
//     callback(null, noOriginHeader); // only allow requests without 'origin' header
//   },
// });

app.use(cors(corsoptions));
// app.use(
//   cors({
//     origin:
//       "https://beab0571-1629-4e09-b29e-735d042e23b3-00-232g9pucjyc96.spock.replit.dev",
//     credentials: true,
//   }),
// );
app.use(express.json());
app.use(cookieParser());
app.use(apiRoutes);

// connect
connectDB();
// listening
// app.listen(PORT);

server.listen(PORT);

// Socket.IO
io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected`);
  const count = io.engine.clientsCount;
  console.log("number of users is", count);
  socket.on("writeComment", async (data) => {
    try {
      connectDB();
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
      console.log("new comment", newComment);
      const post = await PostModel.findById(postId);
      post.comments.push({ owner: memberId, postId: newComment._id });
      await post.save();
    } catch (e) {
      console.log(e);
    }
  });
  socket.on("writePostInPosts", async (data) => {
    connectDB();
    const count = io.engine.clientsCount;
    console.log("number of users is", count);
    try {
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
      console.log(e);
      return res.status(500).json({ error: "Cannot create post" });
    }
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});
