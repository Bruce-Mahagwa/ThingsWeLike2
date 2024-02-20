// dependencines
const jwt = require("jsonwebtoken");
// variables
const express = require("express");
const app = express();
// files
const categoryRoutes = require("./categoryRoutes");
const postRoutes = require("./postRoutes");
const spaceRoutes = require("./spaceRoutes");
const userRoutes = require("./userRoutes");

app.get("/get-token", (req, res) => {
  try {
    const accessToken = req.cookies["access_token"];
    const decoded = jwt.verify(accessToken, process.env["JWT_SECRET"]);
    return res.json({ token: decoded.userName, isAdmin: decoded.isAdmin });
  } catch (e) {
    return res.status(401).send("Unauthorized. Invalid Token");
  }
});

app.use("/categories", categoryRoutes);
app.use("/posts", postRoutes);
app.use("/spaces", spaceRoutes);
app.use("/users", userRoutes);

module.exports = app;
