const { pool } = require("../models/db");

const createComment = (req, res) => {
    // const  posts_id   = req.params.id*1;
    const { comment , users_id , posts_id} = req.body;
    const data = [comment , users_id ,posts_id];
    console.log(data)
    const query = `INSERT INTO comments (comment,posts_id,users_id) VALUES ($1,$2,$3) RETURNING  *;`;
    pool.query(query, data)
        .then((result) => {
            res.status(201).json({
                success: true,
                message: "Comments created successfully",
                result: result.rows,
            });
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
        createComment,
    };

