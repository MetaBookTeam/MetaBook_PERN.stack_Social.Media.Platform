const express = require("express");
const{CreateComments,getcomments}=require("../controllers/Comments")
//controllers
// const {} = require("../controllers/comments");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const commentsRouter = express.Router();
commentsRouter.post('/',CreateComments,getComments)


// usersRouter.post("/", createNewRole);

module.exports = commentsRouter;
