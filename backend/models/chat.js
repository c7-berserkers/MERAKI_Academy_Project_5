const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    chat: { type: String, required: true },
    messages: [{ type: Object }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
