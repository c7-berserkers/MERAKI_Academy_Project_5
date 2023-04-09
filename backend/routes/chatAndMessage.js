const express = require("express");

const chatAndMessageRouter = express.Router();


const { createChat , createMessage } = require('../controllers/chatAndMessage')

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");



//end point

chatAndMessageRouter.post("", createChat);
chatAndMessageRouter.post("/Message/:id", createMessage);








module.exports = chatAndMessageRouter;