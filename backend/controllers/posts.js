const pool = require("../models/db");

const createNewPost = async (req, res) => {
  const { userId } = req.token;
  const { content } = req.body;

  const placeholder = [userId, content];

  try {
    const newPost = await pool.query(
      `INSERT INTO posts (user_id,content) VALUES ($1,$2) RETURNING *;`,
      placeholder
    );
    res.status(200).json({
      success: true,
      message: "Post created successfully",
      res: newPost.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
      res: error.message,
    });
  }
};

const getAllPost = async (req, res) => {
  try {
    const post = await pool.query(`SELECT * FROM posts`);
    res.status(200).json({
      success: true,
      message: "Created successfully",
      res: post.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
      res: error.message,
    });
  }
};

const getPostByUserId = async (req, res) => {
  const userId = req.token.userId;
  const placeholder = [userId];
  try {
    const post = await pool.query(
      `SELECT * FROM posts WHERE user_id = $1`,
      placeholder
    );
    res.status(200).json({
      success: true,
      message: "Created successfully",
      res: post.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      res: error.message,
    });
  }
};

const updatePostById = async (req, res) => {
  const userId = req.token.userId;
  const { post_id } = req.params;
  const { content } = req.body;
  const placeholder = [post_id, content, userId];
  if (content) {
    try {
      const updatePost = await pool.query(
        `UPDATE posts
          SET content = $2
          WHERE id=$1 AND user_id=$3 RETURNING *`,
        placeholder
      );
      res.status(200).json({
        success: true,
        message: "Created successfully",
        res: updatePost.rows,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error",
        res: error.message,
      });
    }
  } else {
    res.status(404).json({
      success: false,
      message: "Enter data",
    });
  }
};

const deletePostById = async (req, res) => {
  const userId = req.token.userId;
  const { post_id } = req.params;
  const placeholder = [post_id, userId];
  const deletePost = await pool.query(
    `DELETE FROM posts
          WHERE id=$1 AND user_id=$2  RETURNING *`,
    placeholder
  );
  res.status(200).json({
    success: true,
    message: "Deleted successfully",
    res: deletePost.rows,
  });
};

module.exports = {
  createNewPost,
  getAllPost,
  getPostByUserId,
  updatePostById,
  deletePostById,
};
