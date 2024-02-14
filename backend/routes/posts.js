const express = require("express");

//controllers
const {
  createNewPost,
  getAllPost,
  getPostByUserId,
  updatePostById,
  deletePostById,
} = require("../controllers/posts");
const { createNewPostLike,deletePostLikeById} = require('../controllers/postLikes')
const authentication = require("../middlewares/authentication");
const postsRouter = express.Router();

// POST
postsRouter.post("/", authentication, createNewPost);
// POST LIKE 
postsRouter.post("/like/:postId", authentication, createNewPostLike);

// GET
postsRouter.get("/", getAllPost);
postsRouter.get("/profile", authentication,getPostByUserId);


// UPDATE
postsRouter.put("/:post_id", authentication, updatePostById);


// DELETE
postsRouter.delete("/:post_id", authentication, deletePostById);
// POST LIKE 
postsRouter.delete("/like/:postId", authentication, deletePostLikeById);

module.exports = postsRouter;
