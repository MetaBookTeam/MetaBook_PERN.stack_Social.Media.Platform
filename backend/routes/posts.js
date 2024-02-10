const express = require("express");

//controllers
const {createNewPost,getAllPost} = require("../controllers/posts");

const postsRouter = express.Router();

// POST 
postsRouter.post("/", createNewPost);

// GET
postsRouter.get("/", getAllPost);


module.exports = postsRouter;
