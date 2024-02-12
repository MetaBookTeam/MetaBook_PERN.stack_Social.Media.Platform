const express = require("express");
const{CreateComments}=require("../controllers/Comments")
//controllers
// const {} = require("../controllers/comments");

const commentsRouter = express.Router();
commentsRouter.post('/',CreateComments)

// usersRouter.post("/", createNewRole);

module.exports = commentsRouter;
