const express = require("express");
const{CreateComments}=require("../controllers/Comments")
//controllers
// const {} = require("../controllers/comments");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const commentsRouter = express.Router();
commentsRouter.post('/',CreateComments)

// usersRouter.post("/", createNewRole);

module.exports = commentsRouter;
