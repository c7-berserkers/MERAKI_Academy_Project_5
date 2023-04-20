const express = require("express");
const {
  createRoom,
  getChatByName,
  getAllChats,
  newMessage,
  mostChats,
  deleteRoom
} = require("../controllers/chats");
const chatRouter = express.Router();

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

//end point

chatRouter.post("/", authentication, createRoom);
chatRouter.post("/:chat_name", authentication, newMessage);
chatRouter.get("/", authentication, getAllChats);
chatRouter.get("/most", authentication, mostChats);
chatRouter.get("/:name", authentication, getChatByName);
chatRouter.delete("/:id", authentication, deleteRoom);

module.exports = chatRouter;
