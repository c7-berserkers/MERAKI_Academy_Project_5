const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();
require("./models/db");
const chatDB = require("./models/chatdb");
const chatModel = require("./models/chats");
const app = express();
const PORT = process.env.PORT || 5000;

// Import Routers
const userRouter = require("./routes/users");
const postRouter = require("./routes/posts");
const roleRouter = require("./routes/roles");
const commentRouter = require("./routes/comments");
const tagRouter = require("./routes/tags");
const likeRouter = require("./routes/likes");
const chatRouter = require("./routes/chats");
app.use(cors());
app.use(express.json());

// Routes Middleware
app.use("/posts", postRouter);
app.use("/roles", roleRouter);
app.use("/comments", commentRouter);
app.use("/users", userRouter);
app.use("/tags", tagRouter);
app.use("/likes", likeRouter);
app.use("/chats", chatRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

const server = app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});


const io = new Server(server, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log("rooms", socket.rooms);
  socket.on("JOIN_ROOM", (data) => {
    console.log("data", data);
    socket.join(data);
    console.log("rooms", socket.rooms);
  });
  socket.on("SEND_MESSAGE", async (data) => {
    console.log("data", data);
    const content = { sender: data.sender, message: data.message };
    const roomId = data.roomId;

    // save the message here
    chatModel.findOneAndUpdate(
      { chat_name: roomId },
      { $push: { messages: content } },
      { new: true }
    );
    socket.to(roomId).emit(RECEIVE_MESSAGE, content);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

