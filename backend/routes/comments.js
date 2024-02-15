const express = require("express");

//controllers
const {
  createComment,
  getCommentsByPostId,
  updateComment,
  deleteComment,
  getCommentById,
} = require("../controllers/comments");

const {
  // getCommentLikeById,
  deleteCommentLikeById,
  createCommentLike,
} = require("../controllers/commentLikes");

const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

//* Create comments router
const commentsRouter = express.Router();

//* endpoint for POST request
commentsRouter.post("/:post_id", authentication, createComment);
commentsRouter.post("/likes/:comment_id", authentication, createCommentLike);

//* endpoint for GET request
commentsRouter.get("/:post_id/comments", authentication, getCommentsByPostId);
commentsRouter.get("/:comment_id", authentication, getCommentById);
//! this function must be getLikesByCommentId ==> it will give us all users who likes this comment.
// commentsRouter.get("/likes/:comment_id", authentication, getCommentLikeById);

//* endpoint for PUT request
commentsRouter.put("/:comment_id", authentication, updateComment);

//* endpoint for DELETE request
commentsRouter.delete("/:comment_id", authentication, deleteComment);

commentsRouter.delete("/likes/:user_id", authentication, deleteCommentLikeById);

module.exports = commentsRouter;
