const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

// This function checks if the user logged in
const authentication = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(403).json({ success: false, Message: "Forbidden" });
  } else {
    const token = req.headers.authorization.split(" ").pop();
    jwt.verify(token, SECRET, (err, result) => {
      if (err) {
        res.status(403).json({
          success: false,
          message: `The token is invalid or expired`,
        });
      } else {
        req.token = result;
        next();
      }
    });
  }
};

module.exports = authentication;
