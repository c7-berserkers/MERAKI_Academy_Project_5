const { pool } = require("../models/db");


const createNewPost = async (req, res)=>{
    console.log("hi osama")

    const {
      img,
description,
user_id
    } = req.body
    // const user_id =req.token.user_id;
  
    // console.log(user_id)
  
    const query = `INSERT INTO posts (img,
        description,
        user_id) VALUES ($1,$2,$3) RETURNING *;`
    const data = [
        img,
        description,
        user_id
    ]
  
    pool.query(query, data)
      .then((result) => {
        res.status(200).json({
          success: true,
          message: 'post created successfully',
        })
      })
      .catch((err) => {
        res.status(409).json({
          success: false,
          message: 'server error',
          err,
        })
      })
  }
  

  
const getAllPost = async (req, res)=>{
  
    const query = `SELECT * FROM posts WHERE is_deleted=0; `
    
    pool.query(query)
      .then((result) => {
        if(result.rows){
        res.status(200).json({
          success: true,
          message: 'get all post successfully',
          result:result.rows
        })
    }else{
        res.status(400).json({
            success: true,
            message: 'no post yet',})
    }
      })
      .catch((err) => {
        res.status(409).json({
          success: false,
          message: 'server error',
          err,
        })
      })
  }
  


module.exports = {
    createNewPost,
    getAllPost
}
