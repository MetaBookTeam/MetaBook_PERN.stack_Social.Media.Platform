const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./models/db");

// Socket.io
const { Server } = require("socket.io");
const messageHandler = require("../backend/controllers/message");
const extraAuth = require("../backend/middlewares/extraAuth");
const socket = require("../backend/middlewares/auth");
const client = {};
const io = new Server(8080, { cors: { origin: "*" } });
io.use(socket); // Auth 
io.on("connection", (socket) => {
  console.log("connected");
  socket.use(extraAuth);
  const user_id = socket.handshake.headers.user_id;
  client[user_id] = { socket_id: socket.id, user_id };
  messageHandler(socket, io);
  socket.on("error", (error) => {
    // socket by def will not handel the error
    // we need to care this out
    socket.emit("error", { error: error.message });
  });
  socket.on("disconnect", () => {
    for (const key in client) {
      if (client[key].socket_id === socket.id) {
        delete client[key];
      }
    }
    console.log(client);
  });
});
//routers
const rolesRouter = require("./routes/roles");
const usersRouter = require("./routes/users");
const pagesRouter = require("./routes/pages");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");

const app = express();

//built-in middleware
app.use(express.json());
app.use(cors());

// router middleware

// TABLES roles / permissions / role_permission
app.use("/roles", rolesRouter);

// TABLES users / user_profile / friends
app.use("/users", usersRouter);

// TABLES pages / page_content / page_likes
app.use("/pages", pagesRouter);

// TABLES posts / posts_likes / photos / shares
app.use("/posts", postsRouter);

// TABLES comments / comment_likes
app.use("/comments", commentsRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
