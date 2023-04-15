const express = require("express");
const { createRoom } = require("../controllers/chats");
const chatRouter = express.Router();

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

//end point

chatRouter.post("/", authentication, createRoom);

module.exports = chatRouter;

/*
 * Testing Object for createChat:

http://localhost:5000/chats

{
"sender_user_id" :1,
"reserver_user_id":2
}
*/

/*
 * Testing Object for createMessage:

http://localhost:5000/chats/Message/:id

{
"sender_user_id" :1 ,
"message":"replay from 1"
}
*/

/*
 * Testing Object for getAllMessageOnSpecificChat:

http://localhost:5000/chats/allMessage/1

*/

/*
 * Testing Object for getAllMessageOnSpecificChat:

http://localhost:5000/chats/1

*/
