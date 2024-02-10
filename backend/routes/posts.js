const express = require("express");

//controllers
const {createNewPost,getAllPost,getPostByUserId,updatePostById} = require("../controllers/posts");

const postsRouter = express.Router();

// POST 
postsRouter.post("/", createNewPost);

// GET
postsRouter.get("/", getAllPost);
postsRouter.get("/profile", getPostByUserId);


// UPDATE
postsRouter.put("/edit/:post_id", updatePostById);

module.exports = postsRouter;
