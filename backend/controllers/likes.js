const { pool } = require("../models/db");

    const addLike = async(req, res) => {
    const  post_id   = req.params.id;

    const {
        reaction} = req.body;

        const user_id =req.token.userId;

    const data = [reaction , user_id ,post_id];
    const data1 = [ user_id ,post_id];

    const query2 = `INSERT INTO likes (reaction , user_id ,posts_id) VALUES ($1,$2,$3);`;

    const query1 = `SELECT * FROM likes WHERE posts_id=$2 AND user_id=$1;`;

    const query3 = `DELETE FROM  likes WHERE posts_id=$2 AND user_id=$1;`;

    const result =await pool.query(query1, data1)
        try {
            if(result.rows.length>0){
        pool.query(query3, data1)
            .then((result) => {
                res.status(201).json({
                    success: true,
                    message: "like delete successfully",
                });
            })
            .catch((err) => {
                res.status(500).json({
                    success: false,
                    message: "Server error",
                    err: err,
                });
            });
            }else{
                pool.query(query2, data)
        .then((result) => {
            res.status(201).json({
                success: true,
                message: "like created successfully",
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
        }
        catch (err){
            res.status(500).json({
                success: false,
                message: "Server error",
                err: err.message,
        })
    }
    
    }


        const getAllLikeForPost = (req, res) => {
            const posts_id = req.params.id;
            const data = [posts_id];
            const query = `SELECT * FROM likes WHERE posts_id=$1;`;       
            pool.query(query, data)
                .then((result) => {
                    res.status(201).json({
                        success: true,
                        message: "get all likes for this post successfully",
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

            
        const getAllLikeForUser = (req, res) => {
            const user_id =req.token.userId;
            const data = [user_id];
            const query = `SELECT * FROM likes WHERE user_id=$1;`;       
            pool.query(query, data)
                .then((result) => {
                    if(result.rows.length>0){
                    res.status(201).json({
                        success: true,
                        message: "get all likes for this user successfully",
                        result: result.rows,
                    });
                    }else{
                        res.status(201).json({
                            success: true,
                            message: "This user don't have any like",
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
        addLike,
        getAllLikeForPost,
        getAllLikeForUser
    };

