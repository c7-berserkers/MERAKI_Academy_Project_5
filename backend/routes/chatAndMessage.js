const express = require("express");

const chatAndMessageRouter = express.Router();


const { createChat } = require('../controllers/chatAndMessage')

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");



//end point

chatAndMessageRouter.post("", createChat);







module.exports = chatAndMessageRouter;