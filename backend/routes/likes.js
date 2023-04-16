const express = require("express");

const likeRouter = express.Router();

const {
  addLike,
  getAllLikeForPost,
  getAllLikeForUser,
  deleteLike,
} = require("../controllers/likes");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

//end point

likeRouter.post("/:id", authentication, addLike);
likeRouter.delete("/:id", authentication, deleteLike);
likeRouter.get("/:id", authentication, getAllLikeForPost);
likeRouter.get("/", authentication, getAllLikeForUser);

module.exports = likeRouter;
