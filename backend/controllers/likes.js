const { pool } = require("../models/db");

const addLike = async (req, res) => {
  const post_id = req.params.id;

  const user_id = req.token.userId;

  const data = [user_id, post_id];

  const query = `INSERT INTO likes (user_id ,posts_id) VALUES ($1,$2) RETURNING *;`;

  pool
    .query(query, data)
    .then(({ rows }) => {
      if (rows.length < 1) {
        return res.status(404).json({
          success: false,
          message: "error 404 post not found",
        });
      }
      res.status(201).json({
        success: true,
        message: "like created",
        result: rows[0],
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};

const deleteLike = (req, res) => {
  const query = `DELETE FROM  likes WHERE posts_id=$1`;
  const post_id = req.params.id;
  const data = [post_id];
  pool
    .query(query, data)
    .then(() => {
      res.status(201).json({
        success: true,
        message: "like deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};
const getAllLikeForPost = (req, res) => {
  const posts_id = req.params.id;
  const data = [posts_id];
  const query = `SELECT * FROM likes WHERE posts_id=$1;`;
  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "get all likes for this post successfully",
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

const getAllLikeForUser = (req, res) => {
  const user_id = req.token.userId;
  const data = [user_id];
  const query = `SELECT * FROM likes WHERE user_id=$1;`;
  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length > 0) {
        res.status(201).json({
          success: true,
          message: "get all likes for this user successfully",
          result: result.rows,
        });
      } else {
        res.status(201).json({
          success: true,
          message: "This user don't have any like",
        });
      }
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
  addLike,
  getAllLikeForPost,
  getAllLikeForUser,
  deleteLike,
};
