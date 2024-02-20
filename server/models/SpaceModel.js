const mongoose = require("mongoose");

const Space = new mongoose.Schema(
  {      
    spaceName: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    members: [
      {
        userName: {
          type: String,
          required: true,
        },
        memberId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
      },
    ],
    posts: [
      {
        owner: {
          type: mongoose.Schema.Types.ObjectId,
        },
        postId: {
          type: mongoose.Schema.Types.ObjectId,
        },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("SpaceModel", Space);
