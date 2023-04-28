const { pool } = require("../models/db");

const createNewPost = async (req, res) => {
  const { img, description, tag_id } = req.body;
  const user_id = req.token.userId;

  console.log(user_id);

  const query = `INSERT INTO posts (img,
        description,
        user_id,tag_id) VALUES ($1,$2,$3,$4) RETURNING *;`;

  const data = [img, description, user_id, tag_id];

  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "post created successfully",
        user_id,
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: "server error",
        err,
      });
    });
};

const getAllPost = async (req, res) => {
  const query = `SELECT 
  posts.*, 
  COUNT(likes.id) AS likes_count, 
  users.img AS user_img, 
  users.first_name AS user_first_name 
FROM 
  posts 
  LEFT JOIN likes ON posts.id = likes.posts_id 
  LEFT JOIN users ON posts.user_id = users.id 
GROUP BY 
  posts.id, 
  users.img, 
  users.first_name 
ORDER BY 
  posts.created_at DESC;
`;

  pool
    .query(query)
    .then((result) => {
      if (result.rows) {
        res.status(200).json({
          success: true,
          message: "get all post successfully",
          result: result.rows,
        });
      } else {
        res.status(400).json({
          success: true,
          message: "no post yet",
        });
      }
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: "server error",
        err,
      });
    });
};

const getPostByUser = (req, res) => {
  const user_id = req.params.id;

  const query = `
  SELECT p.id,p.user_id, p.img, p.description, p.created_at, COUNT(l.id) AS likes_count, u.img AS user_img, u.first_name AS user_first_name 
FROM posts p 
LEFT JOIN likes l ON p.id = l.posts_id 
INNER JOIN users u ON p.user_id = u.id 
WHERE p.user_id = $1 AND p.is_deleted = 0 
GROUP BY p.id, u.img, u.first_name
ORDER BY p.created_at DESC;
`;
  const data = [user_id];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(200).json({
          success: false,
          message: `The user: ${user_id} has no posts`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `All posts for the user: ${user_id}`,
          result: result.rows,
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

const getPostForUser = (req, res) => {
  const user_id = req.params.id;

  const query = `
  SELECT 
  p.id as id, 
  p.img as img, 
  p.description as description, 
  p.created_at as created_at, 
  u.id as user_id, 
  u.img as user_img, 
  u.first_name as user_first_name, 
  COUNT(l.id) as likes_count 
FROM 
  posts p 
  JOIN users u ON p.user_id = u.id 
  JOIN follows f ON f.followed_user_id = p.user_id 
  LEFT JOIN likes l ON l.posts_id = p.id 
WHERE 
  f.following_user_id = $1 AND p.is_deleted = 0 AND u.is_deleted = 0 
GROUP BY 
  p.id, 
  u.id
  ORDER BY created_at DESC;
`;
  const data = [user_id];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: `The user: ${user_id} has no following`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `All posts for the user: ${user_id}`,
          result: result.rows,
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

const getPostById = (req, res) => {
  const id = req.params.id;
  console.log(id);

  const query = `
  SELECT u.first_name,u.img AS user_img,p.id,p.img,p.created_at,p.user_id ,p.description,COUNT(l.posts_id) AS likes_count FROM posts p
  LEFT JOIN likes l ON p.id=l.posts_id
  LEFT JOIN users u ON p.user_id=u.id
  WHERE p.id=$1 AND p.is_deleted=0
  GROUP BY p.img ,p.description ,p.id,u.first_name,u.img;`;

  const query_2 = `SELECT c.user_id,c.id,c.comment,c.post_id,c.created_at,u.first_name,u.img FROM comments c
  LEFT JOIN users u ON c.user_id=u.id
  WHERE post_id=$1
  ORDER BY created_at DESC  ;`;
  const data = [id];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: `The post with id: ${id} is not found`,
        });
      } else {
        pool.query(query_2, data).then((comments) => {
          res.status(200).json({
            success: true,
            message: `get the post with id: ${id} successfully`,
            post: result.rows[0],
            comments: comments.rows,
          });
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

const deletePost = (req, res) => {
  const id = req.params.id;
  // const user_id = req.token.userId;

  const query = `
    UPDATE posts 
    SET is_deleted = 1
    WHERE id=$1 AND is_deleted=0 RETURNING *;`;
  const data = [Number(id)];
  console.log(data);
  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: `The post with id: ${id} is not found`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `get the post with id: ${id} successfully`,
          result: result.rows,
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

const updatePostById = (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  const placeHolders = [description || null, id];
  const query = `UPDATE posts SET description = COALESCE($1,description) WHERE id=$2 AND is_deleted=0 RETURNING *`;
  pool
    .query(query, placeHolders)
    .then(({ rows }) => {
      if (!rows) {
        return res.status(404).json({
          success: false,
          message: `The post with id: ${id} is not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `update the post with id: ${id} successfully`,
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
const getPostsByTag = (req, res) => {
  const { tag } = req.params;
  const query = `
  SELECT p.id, p.img, p.description, p.created_at, COUNT(l.id) AS likes_count, u.img AS user_img, u.first_name AS user_first_name 
FROM posts p 
INNER JOIN users u ON p.user_id = u.id 
LEFT JOIN likes l ON p.id=l.posts_id
INNER JOIN tags t ON p.tag_id = t.id
WHERE p.tag_id =$1 AND p.is_deleted = 0
GROUP BY p.id, p.img, p.description, p.created_at, user_img,u.first_name
ORDER BY p.created_at DESC;
`;
  pool
    .query(query, [tag])
    .then(({ rows }) => {
      if (!rows) {
        return res.status(404).json({
          success: false,
          message: `The posts with tag: ${tag} is not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `the post with tag: ${tag}`,
        result: rows,
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

const unDeletePost = (req, res) => {
  const id = req.params.id;
  // const user_id = req.token.userId;

  const query = `
    UPDATE posts 
    SET is_deleted = 0
    WHERE id=$1 AND is_deleted=1 RETURNING *;`;
  const data = [Number(id)];
  console.log(data);
  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: `The post with id: ${id} is not found`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `get the post with id: ${id} successfully`,
          result: result.rows,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};

const getMostLiked = (req, res) => {
  const query = `SELECT p.id, p.img, p.description, COUNT(l.id) AS total_likes
  FROM posts AS p
  INNER JOIN likes AS l ON l.posts_id = p.id
  WHERE p.is_deleted = 0 AND l.is_deleted = 0
  GROUP BY p.id
  ORDER BY total_likes DESC
  LIMIT 1;
  `;
  pool
    .query(query)
    .then(({ rows }) => {
      res.status(200).json({
        success: true,
        message: `done`,
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

const getMostComments = (req, res) => {
  const query = `SELECT posts.*, COUNT(comments.id) AS comment_count
  FROM posts
  JOIN comments ON posts.id = comments.post_id
  GROUP BY posts.id
  ORDER BY comment_count DESC
  LIMIT 1;
  `;
  pool
    .query(query)
    .then(({ rows }) => {
      res.status(200).json({
        success: true,
        message: `done`,
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

const getPostCount = (req, res) => {
  const query = `SELECT 
  (SELECT COUNT(*) FROM posts) AS post_count, 
  (SELECT COUNT(*) FROM users) AS user_count;
`;
  pool
    .query(query)
    .then(({ rows }) => {
      res.status(200).json({
        success: true,
        message: `most followed user`,
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

module.exports = {
  createNewPost,
  getAllPost,
  getPostByUser,
  getPostById,
  deletePost,
  updatePostById,
  getPostsByTag,
  getPostForUser,
  unDeletePost,
  getMostLiked,
  getMostComments,
  getPostCount,
};
