const { Error } = require("mongoose");
const { pool } = require("../models/db");

const createChat = (req, res) => {

    const {sender_user_id , reserver_user_id} = req.body;

    const data = [sender_user_id , reserver_user_id];
    const query = `INSERT INTO chats (sender_user_id , reserver_user_id) VALUES ($1 ,$2) RETURNING  *;`;
    pool.query(query, data)
        .then((result) => {
            res.status(201).json({
                success: true,
                message: "chat created successfully",
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

    


    const createMessage = (req, res) => {
        const  chat_id   = req.params.id;
        const {sender_user_id , message} = req.body;
        const data = [sender_user_id , chat_id,message];
        console.log(data);
        const query = `INSERT INTO messages (sender_user_id , chat_id , message) VALUES ($1,$2,$3) RETURNING  *;`;
        pool.query(query, data)
            .then((result) => {
                res.status(201).json({
                    success: true,
                    message: "Message created successfully",
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


        const getAllMessageOnSpecificChat  = (req, res) => {
            const  chat_id   = req.params.id;
            const data = [ chat_id ];
            const query = `SELECT * FROM messages WHERE  chat_id=$1  ORDER BY created_at DESC ;`;
            pool.query(query, data)
                .then((result) => {
                    res.status(201).json({
                        success: true,
                        message: "Get all  message on specific chat  successfully",
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

            const deleteChat  = (req, res) => {
                const  id   = req.params.id;
                const data = [ id ];
                const query = `DELETE FROM  chats WHERE  id=$1  RETURNING  * ;`;
                pool.query(query, data)
                    .then((result) => {
                        res.status(201).json({
                            success: true,
                            message: "Chat delete  successfully",
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
        createChat,
        createMessage,
        getAllMessageOnSpecificChat,
        deleteChat
    };



