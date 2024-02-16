const express = require("express");

//controllers
const {
  createNewPost,
  getAllPost,
  getYourPosts,
  getPostByUserId,
  updatePostById,
  deletePostById,
} = require("../controllers/posts");
const {
  createNewPostLike,
  getLikesByPostId,
  deletePostLikeById,
} = require("../controllers/postLikes");

const authentication = require("../middlewares/authentication");
const postsRouter = express.Router();

// POST
postsRouter.post("/", authentication, createNewPost); //done

// POST LIKE
postsRouter.post("/like/:post_id", authentication, createNewPostLike); //done

// GET
postsRouter.get("/", authentication, getAllPost); //done
postsRouter.get("/profile", authentication, getYourPosts); //done
postsRouter.get("/:user_id", authentication, getPostByUserId);
postsRouter.get("/like/:post_id", authentication, getLikesByPostId);

// UPDATE
postsRouter.put("/:post_id", authentication, updatePostById); //done

// DELETE
postsRouter.delete("/:post_id", authentication, deletePostById); //done
// DELETE LIKE
postsRouter.delete("/like/:post_id", authentication, deletePostLikeById); //done

module.exports = postsRouter;
