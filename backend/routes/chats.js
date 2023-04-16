const express = require("express");
const {
  createRoom,
  getChatByName,
  getAllChats,
} = require("../controllers/chats");
const chatRouter = express.Router();

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

//end point

chatRouter.post("/", authentication, createRoom);
chatRouter.get("/", authentication, getAllChats);
chatRouter.get("/:name", authentication, getChatByName);

module.exports = chatRouter;
