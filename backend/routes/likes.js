const express = require("express");

const likeRouter = express.Router();

const {
    addLike,
    getAllLikeForPost,
}= require("../controllers/likes");

//end point

likeRouter.post("/:id", addLike);
likeRouter.get("/:id", getAllLikeForPost);

module.exports = likeRouter;
