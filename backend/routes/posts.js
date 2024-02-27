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
const {
  getShareByPostId,
  createShareByPostId,
  softDeleteShare,
  getAllSharesByUserId,
} = require("../controllers/Shares");

const authentication = require("../middlewares/authentication");
const postsRouter = express.Router();

// POST
postsRouter.post("/", authentication, createNewPost); //done
postsRouter.post("/shares/:post_id", authentication, createShareByPostId);

// POST LIKE
postsRouter.post("/like/:post_id", authentication, createNewPostLike); //done

// GET
postsRouter.get("/", authentication, getAllPost); //done
postsRouter.get("/profile", authentication, getYourPosts); //done
postsRouter.get("/shares/:user_id", authentication, getAllSharesByUserId);
postsRouter.get("/:user_id", authentication, getPostByUserId);
postsRouter.get("/like/:post_id", authentication, getLikesByPostId);
postsRouter.get("/shares/:post_id", authentication, getShareByPostId);

// UPDATE
postsRouter.put("/:post_id", authentication, updatePostById); //done

// DELETE
postsRouter.delete("/:post_id", authentication, deletePostById); //done
// DELETE LIKE
postsRouter.delete("/like/:post_id", authentication, deletePostLikeById); //done
postsRouter.delete("/shares/:share_id", authentication, softDeleteShare);

module.exports = postsRouter;
