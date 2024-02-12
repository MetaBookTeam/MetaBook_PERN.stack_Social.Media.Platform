const express = require("express");
const {
  CreateComments,
  getCommentsByPostId,
  UpdateComments,
  DeleteComments,
  getCommentsById,
  UpdateCommentsById,
} = require("../controllers/Comments");
//controllers
// const {} = require("../controllers/comments");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const commentsRouter = express.Router();
commentsRouter.post("/:id", authentication, CreateComments);
commentsRouter.get("/:id/comments", getCommentsByPostId);
commentsRouter.put("/:comment_id",authentication, UpdateComments);
commentsRouter.delete("/:post_id/comments", DeleteComments);
commentsRouter.get("/:comment_id", getCommentsById);
commentsRouter.put("/:comment_id", UpdateCommentsById);

module.exports = commentsRouter;
