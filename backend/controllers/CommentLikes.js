const pool = require("../models/db");
const getCommentLikeById = async (req,res) => {
  const{like}=req.params
  pool.query(`SELECT * FROM comment_likes WHERE id = $1`,[like]).then((result)=>{
    if (result.rows.length>0 ) {
      return res.status(200).json({
        success: true,
        message: `The comment_like ${like} `,
        result: result.rows
      });
    } else {
      throw new Error("Error happened while getting comments");
    }
  }).catch((error)=>{
    return res.status(404).json({
      success: false,
      message: "cannot found",
      error: error.message,
    });
  })
}
const updateCommentLikeById = async (req, res) => {
  const { comment_like } = req.params;
  const { comment } = req.body; 
  
  try {
    const result = await pool.query('UPDATE comment_likes SET ... WHERE id = $1', [comment_like, ...comment]);
    if (result.rowCount > 0) {
      return res.status(200).json({
        success: true,
        message: `Comment like with ID ${comment_like} updated successfully`,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: `Comment like with ID ${comment_like} not found`,
      });
    }
  } catch (error) {
    console.error("Error occurred while updating comment like:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
const deleteCommentLikeById = async (req, res) => {
  const { comment_like } = req.params;

  try {
    const result = await pool.query('DELETE FROM comment_likes WHERE id = $1', [comment_like]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: `Comment like with ID ${comment_like} not found`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Comment like with ID ${comment_like} deleted successfully`,
    });
  } catch (error) {
    console.error("Error occurred while deleting comment like:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
//
const createCommentLike = async (req, res) => {
  const { comment_id, user_id } = req.body; //  passing commentId and userId in the request body

  try {
    const result = await pool.query('INSERT INTO comment_likes (comment_id, user_id) VALUES ($1, $2) RETURNING *', [comment_id, user_id]);

    if (result.rows.length === 0) {
      return res.status(500).json({
        success: false,
        message: "Failed to create comment like",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Comment like created successfully",
      commentLike: result.rows[0],
    });
  } catch (error) {
    console.error("Error occurred while creating comment like:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
module.exports={
  getCommentLikeById,updateCommentLikeById,deleteCommentLikeById,createCommentLike
}