const mongoose = require("mongoose");

const User = new mongoose.Schema( 
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {     
      type: String,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    avatar: {
      type: String,
    },
    description: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      required: true, 
      default: false,
    },
    spaces: [   
      {
        spaceName: {
          type: String,
          required: true,
        },
        spaceId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
      },  
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("UserModel", User);
