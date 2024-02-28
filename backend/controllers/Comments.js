const pool = require("../models/db");
//create comments
const createComment = (req, res) => {
  const user_id = req.token.userId;
  const { post_id } = req.params;

  //we want to create comment in req.body
  const { comment } = req.body;
  pool
    .query(
      `INSERT INTO comments(user_id,post_id,comment)VALUES($1,$2,$3) RETURNING *`,
      [user_id, post_id, comment]
    )
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Comment created successfully",
        result: result.rows[0],
      });
    })

    .catch((error) => {
      res.status(404).json({
        success: false,
        message: "Server error",
        error,
      });
    });
};

// getCommentByPostId?????
const getCommentsByPostId = (req, res) => {
  /* 
GET http://localhost:5000/comments/:post_id/comments
*/

  const { post_id } = req.params;

  pool
    .query(
      `
    SELECT 
      comments.*, 
      users.image AS commenter_image, 
      user_profile.first_name AS commenter_name 
    
    FROM comments

    LEFT JOIN users
    ON comments.user_id = users.id

    LEFT JOIN user_profile
    ON comments.user_id = user_profile.user_id

    WHERE comments.post_id = $1 AND comments.is_deleted = 0;
    `,
      [post_id]
    )
    .then((result) => {
      if (result.rows.length) {
        res.status(200).json({
          success: true,
          message: "All the comments",
          result: result.rows,
        });
      } else {
        res.status(200).json({
          success: false,
          message: "There is no comments on this post yet.",
        });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        success: false,
        message: "Server error",
        error,
      });
    });
};

const updateComment = (req, res) => {
  /* 
PUT http://localhost:5000/comments/:comment_id

{ 
    "comment": "updated comment"
}
*/
  const { comment_id } = req.params;
  const { comment } = req.body;

  const data = [comment, comment_id];

  pool
    .query(
      `UPDATE comments SET comment = COALESCE($1, comment) WHERE id = $2  RETURNING *;`,
      data
    )
    .then((result) => {
      if (result.rows.length) {
        return res.status(200).json({
          success: true,
          result: result.rows[0],
        });
      } else {
        throw new Error("Error happened while updating comments");
      }
    })
    .catch((error) => {
      return res.status(500).json({
        success: false,
        message: "Server error",
        error,
      });
    });
};

const deleteComment = (req, res) => {
  /* 
DELETE http://localhost:5000/comments/:comment_id
*/

  const { comment_id } = req.params;

  pool
    .query(`UPDATE comments SET is_deleted = 1 WHERE id = $1 RETURNING *;`, [
      comment_id,
    ])
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `Comments with id: ${post_id} deleted successfully`,
        result: result.rows,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        error,
      });
    });
};

const getCommentById = (req, res) => {
  /* 
GET http://localhost:5000/comments/:comment_id
*/

  const { comment_id } = req.params;

  pool
    .query(`SELECT * FROM comments  WHERE is_deleted = 0 AND id=$1 `, [
      comment_id,
    ])
    .then((result) => {
      if (!result.rows.length) {
        res.status(404).json({
          success: false,
          message: `There is no comment with id: ${comment_id}`,
          result: result.rows,
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: `The comment with id: ${comment_id}`,
        result: result.rows,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        success: false,
        message: "Server error",
        error,
      });
    });
};

module.exports = {
  createComment,
  getCommentsByPostId,
  updateComment,
  deleteComment,
  getCommentById,
};
