const jwt = require("jsonwebtoken");

const generateCookie = (_id, userName, email, isAdmin) => {
  return jwt.sign(
    { _id, userName, email, isAdmin },
    process.env["JWT_SECRET"],
    { expiresIn: "7h" },
  );
};
module.exports = { generateCookie };
