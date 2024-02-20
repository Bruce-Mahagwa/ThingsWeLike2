const mongoose = require("mongoose");

const Post = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    owner: [
      {
        memberId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        userName: {
          type: String,
          required: true,
        },
      },
    ],
    comments: [
      {
        owner: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        postId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
      },
    ],
    postedAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("PostSchema", Post);
