const express = require("express");

const postRouter = express.Router();


const{
    createNewPost,
getAllPost,
getPostByUser,
getPostById
  } = require('../controllers/posts')


const { authentication } = require('../middleware/authentication');
const { authorization } = require('../middleware/authorization');


postRouter.post("/",createNewPost)
postRouter.get("/",getAllPost)
postRouter.get("/user/:id",getPostByUser)
postRouter.get("/post/:id",getPostById)





module.exports = postRouter;
