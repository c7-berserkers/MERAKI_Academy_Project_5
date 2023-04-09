const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Import Routers
const userRouter = require("./routes/users");
const postRouter = require("./routes/posts");
const roleRouter = require("./routes/roles");
const commentRouter = require("./routes/comments");
const tagRouter = require("./routes/tags");
const likeRouter = require("./routes/likes");
const chatAndMessageRouter = require("./routes/chatAndMessage");


app.use(cors());
app.use(express.json());

// Routes Middleware
app.use("/posts", postRouter);
app.use("/roles", roleRouter);
app.use("/comments", commentRouter);
app.use("/users", userRouter);
app.use("/tags", tagRouter);
app.use("/likes", likeRouter);
app.use("/chat", chatAndMessageRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
