const express = require("express");

const postRouter = express.Router();


const{
    createNewPost,
getAllPost,
getPostByUser,
getPostById,
deletePost
  } = require('../controllers/posts')


const  authentication  = require('../middleware/authentication');
const authorization  = require('../middleware/authorization');


postRouter.post("/",authentication,createNewPost)
postRouter.get("/",authentication,authorization("CREATE"),getAllPost)
postRouter.get("/user/:id",authentication,authorization("CREATE"),getPostByUser)
postRouter.get("/:id",authentication,authorization("CREATE"),getPostById)
postRouter.delete("/post/:id",authentication,authorization("CREATE"),deletePost)





module.exports = postRouter;
