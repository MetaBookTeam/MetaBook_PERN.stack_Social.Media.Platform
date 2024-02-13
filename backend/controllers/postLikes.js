const pool = require("../models/db");

// user can like multi times
const createNewPostLike = async (req, res) => {
  const user_id = req.token.userId;
  const { postId } = req.params;
  const placeholder = [postId, user_id];
  try {
    const newLike = await pool.query(
      `INSERT INTO posts_likes (post_id,user_id) VALUES ($1,$2) RETURNING *`,
      placeholder
    );
    console.log(newLike);
    res.status(200).json({
        success:true,
        message:"Like added successfully",
        res:newLike.rows
    })
  } catch (error) {
    res.status(404).json({
        success:false,
        message:"Server error",
        res:error
    })
  }
};

const deletePostLikeById = async (req, res) => {
    const user_id = req.token.userId;
    const { postId } = req.params;
    const placeholder = [postId, user_id];
    try {
      const deleteLike = await pool.query(
        `DELETE FROM posts_likes
          WHERE id=$1 AND user_id=$2  RETURNING *`,
        placeholder
      );
      res.status(200).json({
          success:true,
          message:"Remove like successfully",
          res:deleteLike.rows
      })
    } catch (error) {
      res.status(404).json({
          success:false,
          message:"Server error",
          res:error
      })
    }
};
module.exports = {
  createNewPostLike,
  deletePostLikeById,
};
