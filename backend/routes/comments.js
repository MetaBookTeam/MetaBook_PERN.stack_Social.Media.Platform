const express = require("express");

//controllers
const {
  CreateComments,
  getCommentsByPostId,
  getCommentsByPostId,
  UpdateComments,
  DeleteComments,
  getCommentsById,
  UpdateCommentsById,
  getCommentLikeById,
  updateCommentLikeById,
  deleteCommentLikeById,
  createCommentLike,
} = require("../controllers/Comments");

const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

//* Create comments router
const commentsRouter = express.Router();

//* endpoint for the POST request
commentsRouter.post("/:id", authentication, CreateComments);
commentsRouter.post("/comment_like", createCommentLike);

//* endpoint for the GET request
commentsRouter.get("/", authentication, getComments);
commentsRouter.get("/comments/:id", authentication, getCommentsById);
commentsRouter.get("/:id/comments", authentication, getCommentsByPostId);
commentsRouter.get("/:comment_id", authentication, getCommentsById);
commentsRouter.get("/like/:id", getCommentLikeById);

//* endpoint for the PUT request
commentsRouter.put("/", authentication, UpdateComments);
commentsRouter.put("/:comment_id", authentication, UpdateComments);
commentsRouter.put("/comments/:id", authentication, UpdateCommentsById);
commentsRouter.put("/comment_like/:id", updateCommentLikeById);

//* endpoint for the DELETE request
commentsRouter.delete("/", authentication, DeleteComments);
commentsRouter.delete("/:post_id/comments", authentication, DeleteComments);
commentsRouter.delete("/comment_like/:id", deleteCommentLikeById);

module.exports = commentsRouter;
