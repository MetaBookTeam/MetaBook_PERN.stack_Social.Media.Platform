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
  UpdateCommentsById,
} = require("../controllers/Comments");
const{getCommentLikeById, updateCommentLikeById, deleteCommentLikeById,createCommentLike}=require('../controllers/CommentLikes')
//controllers
// const {} = require("../controllers/comments");
//controllers
// const {} = require("../controllers/comments");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

//* Create comments router
const commentsRouter = express.Router();
//post ==>http://localhost:5000/comments/1
commentsRouter.post("/:id", authentication,CreateComments);
//get==>http://localhost:5000/comments/1/comments
commentsRouter.get("/:id/comments",authentication,getCommentsByPostId);
//put ==>http://localhost:5000/comments/1
commentsRouter.put("/:comment_id",authentication, UpdateComments);
//delete ==>http://localhost:5000/:post_id/comments
commentsRouter.delete("/:post_id/comments",authentication,DeleteComments);
//get ==>http://localhost:5000/:comment_id
commentsRouter.get("/:comment_id", authentication,getCommentsById);
//put ==>http://localhost:5000/:comment_id
commentsRouter.put("/comments/:id",authentication,UpdateCommentsById);

//* endpoint for CommentLike POST request
commentsRouter.post('/comment_like',authentication,createCommentLike)
//* endpoint for CommentLike delete request
commentsRouter.delete("/",authentication,DeleteComments); 
commentsRouter.delete('/comment_like/:id',authentication,deleteCommentLikeById)
//* endpoint for CommentLike get request
commentsRouter.get('/like/:id',authentication,getCommentLikeById)
//* endpoint for CommentLike update request
commentsRouter.put('/comment_like/:id',authentication,updateCommentLikeById)
/* //* endpoint for the POST request
commentsRouter.post("/",authentication,CreateComments);

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
