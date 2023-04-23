const express = require("express");

const postRouter = express.Router();

const {
  createNewPost,
  getAllPost,
  getPostByUser,
  getPostById,
  deletePost,
  updatePostById,
  getPostsByTag,
  getPostForUser,
  getPostCount,
  unDeletePost,
  getMostLiked,
  getMostComments,
} = require("../controllers/posts");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

postRouter.post("/", authentication, createNewPost);
postRouter.get("/", authentication, authorization("CREATE"), getAllPost);
postRouter.get(
  "/mostlikes/post",
  authentication,
  authorization("CREATE"),
  getMostLiked
);
postRouter.get(
  "/count/post",
  authentication,
  authorization("CREATE"),
  getPostCount
);
postRouter.get(
  "/mostcomments/post",
  authentication,
  authorization("CREATE"),
  getMostComments
);
postRouter.get(
  "/user/:id",
  authentication,
  authorization("CREATE"),
  getPostByUser
);
postRouter.get("/:id", authentication, authorization("CREATE"), getPostById);
postRouter.get("/following/:id", authentication, getPostForUser);
postRouter.get(
  "/tag/:tag",
  authentication,
  authorization("CREATE"),
  getPostsByTag
);
postRouter.put("/:id", authentication, authorization("CREATE"), updatePostById);
postRouter.delete("/:id", authentication, authorization("CREATE"), deletePost);
postRouter.delete(
  "/undelete/:id",
  authentication,
  authorization("CREATE"),
  unDeletePost
);

module.exports = postRouter;
