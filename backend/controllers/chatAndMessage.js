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

    
    module.exports = {
        createChat,

    };



