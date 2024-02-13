const express = require("express");
const{getCommentLikeById}=require('../controllers/CommentLikes');
const authentication = require("../middlewares/authentication");
const commentLikeRouter = express.Router();
commentLikeRouter.get('/comment_like/:id',authentication,getCommentLikeById)




module.exports = commentLikeRouter;
