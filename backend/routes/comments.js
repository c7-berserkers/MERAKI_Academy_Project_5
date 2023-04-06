const express = require("express");

const commentRouter = express.Router();

const { createComment } = require('../controllers/comments')

//end point

commentRouter.post("/:id", createComment );


module.exports = commentRouter;
