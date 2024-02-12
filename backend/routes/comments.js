const express = require("express");
const{CreateComments,getcomments,UpdateComments,DeleteComments}=require("../controllers/Comments")
//controllers
// const {} = require("../controllers/comments");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const commentsRouter = express.Router();
commentsRouter.post('/',CreateComments)
commentsRouter.get('/',getcomments);
commentsRouter.put('/',UpdateComments)
commentsRouter.delete('/',DeleteComments)
// usersRouter.post("/", createNewRole);

module.exports = commentsRouter;
