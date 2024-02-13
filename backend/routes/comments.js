const express = require("express");
const {
  CreateComments,
  getCommentsByPostId,
  UpdateComments,
  DeleteComments,
  getCommentsById,
  UpdateCommentsById,getCommentLikeById, updateCommentLikeById, deleteCommentLikeById,createCommentLike
} = require("../controllers/Comments");
//controllers
// const {} = require("../controllers/comments");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
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
/* //* endpoint for the POST request
commentsRouter.post("/",authentication,CreateComments);

//* endpoint for the GET request
commentsRouter.get("/",authentication,getComments);
commentsRouter.get("/comments/:id",authentication, getCommentsById);

//* endpoint for the PUT request
commentsRouter.put("/",authentication,UpdateComments);


//* endpoint for the DELETE request
commentsRouter.delete("/",authentication,DeleteComments); */
commentsRouter.post('/comment_like',createCommentLike)
commentsRouter.get('/like/:id',getCommentLikeById)
commentsRouter.put('/comment_like/:id',updateCommentLikeById)
commentsRouter.delete('/comment_like/:id',deleteCommentLikeById)


module.exports = commentsRouter;
/* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInJvbGUiOjIsImlhdCI6MTcwNzg1MjE3NCwiZXhwIjoxNzA3OTM4NTc0fQ.fZMso0BUexUhU1ujyAAwgoLAsILN4Spau3LLwGfjv6E */