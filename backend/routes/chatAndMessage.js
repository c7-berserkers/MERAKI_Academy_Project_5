const express = require("express");

const chatAndMessageRouter = express.Router();


const { createComment ,  } = require('../controllers/comments')

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");



//end point

chatAndMessageRouter.post("/:id", createComment);




module.exports = chatAndMessageRouter;