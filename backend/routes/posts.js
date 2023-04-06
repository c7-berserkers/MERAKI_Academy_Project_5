const express = require("express");

const postRouter = express.Router();


const{
    createNewPost,
getAllPost
  } = require('../controllers/posts')


const { authentication } = require('../middleware/authentication');
const { authorization } = require('../middleware/authorization');


postRouter.post("/",createNewPost)
postRouter.get("/",getAllPost)





module.exports = postRouter;
