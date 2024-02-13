const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./models/db");

//routers
const rolesRouter = require("./routes/roles");
const usersRouter = require("./routes/users");
const pagesRouter = require("./routes/pages");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const commentLikeRouter = require("./routes/CommentLike");

const app = express();

//built-in middleware
app.use(express.json());
app.use(cors());


// 




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
app.use('/comment_like',commentLikeRouter)

const PORT = process.env.PORT || 5000;
// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));
app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
