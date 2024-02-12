const express = require("express");
const{CreateComments,getcomments,UpdateComments,DeleteComments,getCommentsById}=require("../controllers/Comments")
//controllers
// const {} = require("../controllers/comments");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const commentsRouter = express.Router();
commentsRouter.post('/',CreateComments)
commentsRouter.get('/',getcomments);
commentsRouter.put('/',UpdateComments)
commentsRouter.delete('/',DeleteComments)
commentsRouter.get('/comments/:id',getCommentsById)
// usersRouter.post("/", createNewRole);

module.exports = commentsRouter;
