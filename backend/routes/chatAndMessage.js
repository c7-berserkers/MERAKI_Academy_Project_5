const express = require("express");

const chatAndMessageRouter = express.Router();


const { createChat , createMessage , getAllMessageOnSpecificChat ,deleteChat} = require('../controllers/chatAndMessage')

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");



//end point

chatAndMessageRouter.post("", createChat);
chatAndMessageRouter.post("/Message/:id", createMessage);
chatAndMessageRouter.get("/allMessage/:id", getAllMessageOnSpecificChat);
chatAndMessageRouter.delete("/:id", deleteChat);















module.exports = chatAndMessageRouter;