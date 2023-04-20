const chatModel = require("../models/chats");

const createRoom = (req, res) => {
  const { chat_name } = req.body;
  const newRoom = new chatModel({ chat_name, messages: [] });
  newRoom
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `chat created`,
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const getChatByName = (req, res) => {
  const { name } = req.params;
  chatModel
    .findOne({ chat_name: name })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `chat found`,
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const getAllChats = (req, res) => {
  chatModel
    .find()
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `all chats`,
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const newMessage = (req, res) => {
  const { chat_name } = req.params;
  const { content } = req.body;
  chatModel
    .findOneAndUpdate(
      { chat_name },
      { $push: { messages: content } },
      { new: true }
    )
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `message sent`,
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const mostChats = (req, res) => {
  chatModel
    .aggregate([
      {
        $project: {
          _id: 1,
          chat_name: 1,
          message_count: { $size: "$messages" },
        },
      },
      { $sort: { message_count: -1 } },
      { $limit: 1 },
    ])
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `done`,
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const deleteRoom = (req, res) => {
  const _id =req.params.id
  chatModel.findByIdAndDelete({_id})
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `chat created`,
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};
module.exports = {
  createRoom,
  getChatByName,
  getAllChats,
  newMessage,
  mostChats,
  deleteRoom
};
