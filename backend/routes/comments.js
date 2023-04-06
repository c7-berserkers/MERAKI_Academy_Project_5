const express = require("express");

const commentRouter = express.Router();

const { createComment , deleteComment , getAllCommentForPostComment
        ,getAllCommentForPostCommentACS } = require('../controllers/comments')

//end point

commentRouter.post("/:id", createComment );

commentRouter.delete("/:id", deleteComment );

// get all comment for specific post (descending or ascending)
commentRouter.get("/:id", getAllCommentForPostComment );




module.exports = commentRouter;
