const { pool } = require("../models/db");

const createComment = (req, res) => {
  const post_id = req.params.id;
  const user_id = req.token.userId;
  const { comment } = req.body;
  const data = [comment, user_id, post_id];
  console.log(data);
  const query = `INSERT INTO comments (comment,post_id,user_id) VALUES ($1,$3,$2) RETURNING  *;`;
  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Comment created successfully",
        result: result.rows[0],
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const deleteComment = (req, res) => {
  const { id } = req.params;
  const data = [id];
  console.log(data);
  const query = `DELETE FROM comments WHERE id=($1) RETURNING *;`;
  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Comment delete successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const getAllCommentForPostComment = (req, res) => {
  const { id } = req.params;
  const data = [id];
  const query = `SELECT c.id,c.comment,c.post_id,c.created_at,u.first_name,u.img,u.id AS user_id FROM comments c
            LEFT JOIN users u ON c.user_id=u.id
            WHERE post_id=$1
            ORDER BY created_at DESC  ;`;
  pool
    .query(query, data)
    .then((result) => {
      if (!result.rows) {
        return res.status(404).json({
          success: false,
          message: "no comments yet",
        });
      }
      res.status(200).json({
        success: true,
        message: "Get all comment for this post successfully",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const updateComment = (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const data = [comment, id];

  const query = `UPDATE comments SET comment = $1  WHERE id=$2  RETURNING  * ;`;
  pool
    .query(query, data)
    .then((result) => {
      console.log("result");
      res.status(201).json({
        success: true,
        message: "Update comment for this post successfully",
        result: result.rows[0].comment,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

module.exports = {
  createComment,
  deleteComment,
  getAllCommentForPostComment,
  updateComment,
};
