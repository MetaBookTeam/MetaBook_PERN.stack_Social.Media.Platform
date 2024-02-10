const express = require("express");

//controllers
const {createNewPost,getAllPost,getPostByUserId,updatePostById,deletePostById} = require("../controllers/posts");

const postsRouter = express.Router();

// POST 
postsRouter.post("/", createNewPost);

// GET
postsRouter.get("/", getAllPost);
postsRouter.get("/profile", getPostByUserId);


// UPDATE
postsRouter.put("/:post_id", updatePostById);

// DELETE
postsRouter.delete("/:post_id", deletePostById);

module.exports = postsRouter;
