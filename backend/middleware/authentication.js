const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

// This function checks if the user logged in
const authentication = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(403).json({ success: false, Message: "Forbidden" });
  } else {
    req.token = req.headers.authorization.split(" ").pop();
    const parsedToken = jwt.verify(req.token, SECRET);
    parsedToken
      ? next()
      : res
          .status(403)
          .json({ success: false, Message: "The token is invalid or expired" });
  }
};

module.exports = authentication;
