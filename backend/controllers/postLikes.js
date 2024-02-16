const pool = require("../models/db");

//! user still can like multiple times
const createNewPostLike = async (req, res) => {
  /* 
POST http://localhost:5000/posts/like/:post_id

//@ 
oldLike.rows.length ==> already liked
*/

  const user_id = req.token.userId;
  const { post_id } = req.params;

  const placeholder = [post_id, user_id];

  try {
    const newLike = await pool.query(
      `INSERT INTO posts_likes (post_id,user_id) VALUES ($1,$2) RETURNING *;`,
      placeholder
    );
    res.status(200).json({
      success: true,
      message: "Like added successfully",
      result: newLike.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "createNewPostLike Server error",
      error,
    });
  }
};

const getLikesByPostId = async (req, res) => {
  /* 
GET http://localhost:5000/posts/like/:post_id

//@
query " SELECT * FROM posts_likes WHERE post_id = $1 "

*/


};

const deletePostLikeById = async (req, res) => {
  /* 
DELETE http://localhost:5000/posts/like/:post_id
*/
  const user_id = req.token.userId;
  const { post_id } = req.params;

  const placeholder = [post_id, user_id];

  try {
    const deleteLike = await pool.query(
      `DELETE FROM posts_likes
          WHERE id=$1 AND user_id=$2  RETURNING *;`,
      placeholder
    );
    res.status(200).json({
      success: true,
      message: "Remove like successfully",
      result: deleteLike.rows,
    });
    console.log(deleteLike.rows);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "deletePostLikeById Server error",
      error,
    });
  }
};

module.exports = {
  createNewPostLike,
  getLikesByPostId,
  deletePostLikeById,
};
