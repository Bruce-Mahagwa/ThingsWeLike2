const mongoose = require("mongoose");
require('dotenv').config()
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongodb");
  } catch (e) {
    console.log("failed to connect to database");
    console.log(e);
    process.exit(1);
  }
};
module.exports = connectDB;
