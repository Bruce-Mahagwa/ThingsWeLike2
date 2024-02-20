// dependencies
const jwt = require("jsonwebtoken");

const verifyIsLoggedIn = (req, res, next) => {
  const token = req.cookies?.access_token;
  try {   
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const userInfo = jwt.verify(token, process.env["JWT_SECRET"]);
      req.user = userInfo;
      next();
    } catch (e) {
      console.log(e);
      res.status(401).send("Unauthorized User");
    }
  } catch (e) {
    console.log(e);
    res.status(401).send("");
  }
};

const verifyIsAdmin = (req, res, next) => {
  try {
    const userInfo = req.user;
    if (userInfo && userInfo.isAdmin) {
      next();
    } else {
      return res
        .status(503)
        .send("You are not authorized to access this routes");
    }
  } catch (e) {
    console.log(e);
    return res
      .status(401)
      .send("Admin credentials required to access this route");
  }
};

module.exports = { verifyIsLoggedIn, verifyIsAdmin };
