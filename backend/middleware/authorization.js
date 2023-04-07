const jwt = require("jsonwebtoken");
const { pool } = require("../models/db");

const SECRET = process.env.SECRET;

// This function checks if the user has a permission the passed permission
const authorization = (string) => {
  return (req, res, next) => {
    const role_id = req.token.role_id;
    const placeHolders = [string, role_id];
    const query = `SELECT * FROM role_permission FULL OUTER JOIN roles ON role_permission.role_id = roles.id FULL OUTER JOIN permissions ON role_permission.permission_id = permissions.id WHERE permissions.permission = $1 AND roles.id = $2 ;`;
    pool
      .query(query, placeHolders)
      .then(({ rows }) => {
        if (!rows) {
          res.status(403).json({ success: false, Message: "Unauthorized" });
        } else {
          next();
        }
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          Message: "SERVER ERROR",
          err,
        });
      });
  };
};

module.exports = authorization;
