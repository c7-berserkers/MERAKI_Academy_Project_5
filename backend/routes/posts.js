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
} = require("../controllers/posts");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

postRouter.post("/", authentication, createNewPost);
postRouter.get("/", authentication, authorization("CREATE"), getAllPost);
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

module.exports = postRouter;
