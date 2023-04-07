const express = require("express");

const commentRouter = express.Router();


const { createComment , deleteComment , getAllCommentForPostComment , updateComment } = require('../controllers/comments')

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");



//end point

commentRouter.post("/:id", createComment);

commentRouter.delete("/:id", deleteComment);


// get all comment for specific post (descending)
commentRouter.get("/:id", getAllCommentForPostComment );


commentRouter.put("/:id", updateComment );




module.exports = commentRouter;


/*
 * Testing Object for createComment:

http://localhost:5000/comments/:id

{
"comment" :"comment her", 
"user_id" : 2
}
*/


/*
 * Testing Object for deleteComment:

http://localhost:5000/comments/:id

*/


/*
 * Testing Object for getAllCommentForPostComment:

http://localhost:5000/comments/:id

*/


/*
 * Testing Object for updateComment:

http://localhost:5000/comments/:id

{

"comment" :"new comment her "

}


*/

