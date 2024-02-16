const express = require("express");
const {
  CreateComments,
  getCommentsByPostId,
  getCommentsByPostId,
  UpdateComments,
  DeleteComments,
  getCommentsById,
  UpdateCommentsById,
} = require("../controllers/Comments");
const {
  getCommentLikeById,
  updateCommentLikeById,
  deleteCommentLikeById,
  createCommentLike,
} = require("../controllers/CommentLikes");
//controllers
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const commentsRouter = express.Router();
//* endpoint for CommentLike

 //* endpoint for the POST request
commentsRouter.post("/:id", authentication, CreateComments);
commentsRouter.post("/comment_like", authentication, createCommentLike);

//* endpoint for the GET request
commentsRouter.get("/comments/:id",authentication, getCommentsById);
commentsRouter.get("/:id/comments", authentication, getCommentsByPostId);
commentsRouter.get("/comment_like/:id", authentication, getCommentLikeById);

//* endpoint for the PUT request
commentsRouter.put("/",authentication,UpdateComments);
commentsRouter.put("/:comment_id", authentication, UpdateComments);
commentsRouter.put("/comments/:id", authentication, UpdateCommentsById);
commentsRouter.put("/comment_like/:id", authentication, updateCommentLikeById);


//* endpoint for the DELETE request
commentsRouter.delete("/:post_id/comments", authentication, DeleteComments);
commentsRouter.delete("/", authentication, DeleteComments);
commentsRouter.delete( "/comment_like/:id",authentication,deleteCommentLikeById);


module.exports = commentsRouter;

