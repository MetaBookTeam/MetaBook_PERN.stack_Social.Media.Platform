const express = require("express");

//controllers
const {createNewPost,getAllPost,getPostByUserId,updatePostById,deletePostById} = require("../controllers/posts");
const authentication = require('../middlewares/authentication')
const postsRouter = express.Router();

// POST 
postsRouter.post("/",authentication, createNewPost);

// GET
postsRouter.get("/", getAllPost);
postsRouter.get("/profile", authentication,getPostByUserId);


// UPDATE
postsRouter.put("/:post_id", authentication,updatePostById);

// DELETE
postsRouter.delete("/:post_id",authentication, deletePostById);

module.exports = postsRouter;
