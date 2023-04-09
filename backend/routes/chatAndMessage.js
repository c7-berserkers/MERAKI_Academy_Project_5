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
