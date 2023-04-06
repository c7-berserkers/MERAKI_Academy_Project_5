const express = require("express");

const commentRouter = express.Router();

const { createComment , deleteComment , getAllCommentForPostComment} = require('../controllers/comments')

//end point

commentRouter.post("/:id", createComment );
commentRouter.delete("/:id", deleteComment );
commentRouter.get("/:id", getAllCommentForPostComment );




module.exports = commentRouter;
