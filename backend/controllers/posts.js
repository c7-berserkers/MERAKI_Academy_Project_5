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
  
  const getPostByUser = (req, res)=>{
  const user_id =req.params.id
  console.log(user_id)
    

  const query = `SELECT * FROM posts WHERE user_id= $1 AND is_deleted=0;`;
  const data = [user_id];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).json({
          success: false,
          message: `The user: ${user_id} has no posts`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `All posts for the user: ${user_id}`,
          result: result.rows,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
  } 


  const getPostById = (req, res)=>{
    const id =req.params.id
    console.log(id)
      
  
    const query = `SELECT * FROM posts WHERE id= $1 AND is_deleted=0;`;
    const data = [id];
  
    pool
      .query(query, data)
      .then((result) => {
        if (result.rows.length === 0) {
          res.status(404).json({
            success: false,
            message: `The post with id: ${id} is not found`,
          });
        } else {
          res.status(200).json({
            success: true,
            message: `get the post with id: ${id} successfully`,
            result: result.rows,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server error",
          err: err,
        });
      });
    } 


    
  const deletePost = (req, res)=>{
    const id =req.params.id
    console.log(id)
    user_id
  
    const query = `
    UPDATE posts 
    SET is_deleted = 1
    WHERE user_id=1 AND id= 2 AND is_deleted=0;`;
    const data = [id];
  
    pool
      .query(query, data)
      .then((result) => {
        if (result.rows.length === 0) {
          res.status(404).json({
            success: false,
            message: `The post with id: ${id} is not found`,
          });
        } else {
          res.status(200).json({
            success: true,
            message: `get the post with id: ${id} successfully`,
            result: result.rows,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server error",
          err: err,
        });
      });
    }

module.exports = {
    createNewPost,
    getAllPost,
    getPostByUser,
    getPostById
}
