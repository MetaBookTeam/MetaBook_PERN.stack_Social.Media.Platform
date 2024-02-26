const pool = require("../models/db");

//! see route/comments.js from more notes
// const getCommentLikeById = async (req, res) => {

//   /*
// GET http://localhost:5000/comments/likes/:comment_id
// */

//   const { comment_id } = req.params;

//   pool
//     .query(`SELECT * FROM comment_likes WHERE id = $1`, [comment_id])
//     .then((result) => {
//       if (result.rows.length > 0) {
//         return res.status(200).json({
//           success: true,
//           message: `The comment_like ${like} `,
//           result: result.rows,
//         });
//       } else {
//         throw new Error("Error happened while getting comments");
//       }
//     })
//     .catch((error) => {
//       return res.status(500).json({
//         success: false,
//         message: "cannot found",
//         error: error.message,
//       });
//     });
// };

const deleteCommentLikeById = async (req, res) => {
  /* 
DELETE http://localhost:5000/comments/likes/:like_id
*/

  const { user_id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM comment_likes WHERE user_id = $1",
      [user_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: `User with ID ${user_id} like on this comment not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: `user ${user_id} unliked this comment`,
    });
  } catch (error) {
    console.error("Error occurred while deleting comment like:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
//
const createCommentLike = async (req, res) => {
  /* 
POST http://localhost:5000/comments/likes/:comment_id

*/
  const user_id = req.token.userId;
  const { comment_id } = req.params;

  try {
    const result = await pool.query(
      "INSERT INTO comment_likes (comment_id, user_id) VALUES ($1, $2) RETURNING *",
      [comment_id, user_id]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        success: false,
        message: "Failed to create comment like",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Comment like created successfully",
      result: result.rows,
    });
  } catch (error) {
    console.error("Error occurred while creating comment like:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
const getLikesByCommentId=(req,res)=>{
  const {comment_id}=req.params
  //const (user_id)=req.body;

pool.query(`SELECT user_id FROM comment_likes WHERE comment_id=$1`,[comment_id]).then((result)=>{
  return res.status(201).json({
    success: true,
    message: " likes of comment ",
    result: result.rows,
  });
}).catch((error)=>{
  return res.status(500).json({
    success: false,
    message: "Internal server error",
    error,
  });
})
}
module.exports = {
  // getCommentLikeById,
  deleteCommentLikeById,
  createCommentLike,getLikesByCommentId
};
