const express = require("express");

//controllers
const {createNewPost,getAllPost,getPostByUserId} = require("../controllers/posts");

const postsRouter = express.Router();

// POST 
postsRouter.post("/", createNewPost);

// GET
postsRouter.get("/", getAllPost);
postsRouter.get("/profile", getPostByUserId);


module.exports = postsRouter;
