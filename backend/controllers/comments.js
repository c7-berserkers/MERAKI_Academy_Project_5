const { pool } = require("../models/db");

const createComment = (req, res) => {
    const  posts_id   = req.params.id;
    const { comment , users_id } = req.body;
    const data = [comment , users_id ,posts_id];
    console.log(data)
    const query = `INSERT INTO comments (comment,posts_id,users_id) VALUES ($1,$2,$3) RETURNING  *;`;
    pool.query(query, data)
        .then((result) => {
            res.status(201).json({
                success: true,
                message: "Comment created successfully",
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

    const deleteComment = (req, res) => {
        const {id} = req.body;
        const data = [id];
        const query = `DELETE FROM  comments WHERE id=$1 RETURNING  *;`;
        pool.query(query, data)
            .then((result) => {
                res.status(201).json({
                    success: true,
                    message: "Comment delete successfully",
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


        const gitComment = (req, res) => {
            const {id} = req.body;
            const data = [id];
            const query = `DELETE FROM  comments WHERE id=$1 RETURNING  *;`;
            pool.query(query, data)
                .then((result) => {
                    res.status(201).json({
                        success: true,
                        message: "Comment delete successfully",
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
        deleteComment
    };

