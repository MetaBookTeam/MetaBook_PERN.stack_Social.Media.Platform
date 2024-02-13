const express = require("express");
const{CreateComments,getComments,UpdateComments,DeleteComments,getCommentsById,UpdateCommentsById}=require("../controllers/Comments")
//controllers
// const {} = require("../controllers/comments");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const commentsRouter = express.Router();
commentsRouter.post('/',CreateComments)
commentsRouter.get('/',getComments);
commentsRouter.put('/',UpdateComments)
commentsRouter.delete('/',DeleteComments)
commentsRouter.get('/comments/:id',getCommentsById)
commentsRouter.put('/comments/:id',UpdateCommentsById)

module.exports = commentsRouter; 
