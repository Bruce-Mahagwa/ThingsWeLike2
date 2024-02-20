const mongoose = require("mongoose");

const Comments = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  postedAt: {
    type: Date,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("CommentsModel", Comments);
