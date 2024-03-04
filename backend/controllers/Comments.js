const pool = require("../models/db");
//create comments
const createComment = (req, res) => {
  const { userId } = req.token;
  const { post_id } = req.params;
  const { comment } = req.body;

  pool
    .query(
      `INSERT INTO comments (user_id, post_id, comment) 
      VALUES ($1, $2, $3) 
      RETURNING *;`,
      [userId, post_id, comment]
    )
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Comment created successfully",
        result: result.rows, // array of one object, will be handled the same as other results with spread operator in axios ...result.data.result
      });
    })

    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "createComment Server error",
        error,
      });
    });
};

// getCommentByPostId?????
const getCommentsByPostId = (req, res) => {
  /* 
GET https://meraki-academy-project-5.onrender.com/comments/:post_id/comments
*/

  const { post_id } = req.params;

  pool
    .query(
      `

      WITH cte_comment_likes AS (
        SELECT comment_id, COUNT(*) AS total_comment_likes
        FROM comment_likes
        GROUP BY comment_id
        )
    --  ),

    SELECT 
      c.*, 
      users.image AS commenter_image, 
      user_profile.first_name, 
      user_profile.last_name,
    
      COALESCE(cl.total_comment_likes, 0) AS comment_likes

    FROM comments c

    LEFT JOIN users
    ON c.user_id = users.id

    LEFT JOIN user_profile
    ON c.user_id = user_profile.user_id

    left join cte_comment_likes cl
    on c.id = cl.comment_id

    WHERE c.post_id = $1 AND c.is_deleted = 0;

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
        message: "getCommentsByPostId Server error",
        error,
      });
    });
};

const updateComment = (req, res) => {
  /* 
PUT https://meraki-academy-project-5.onrender.com/comments/:comment_id

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
        message: "updateComment Server error",
        error,
      });
    });
};

const deleteComment = (req, res) => {
  /* 
DELETE https://meraki-academy-project-5.onrender.com/comments/:comment_id
*/

  const { comment_id } = req.params;

  pool
    // .query(`UPDATE comments SET is_deleted = 1 WHERE id = $1 RETURNING *;`,
    .query(
      `DELETE FROM comments WHERE id = $1 RETURNING *;`,
      [comment_id]
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `Comments with id: ${comment_id} deleted successfully`,
        result: result.rows,
      });
    })
    .catch((error) => {
      console.log("deleteComment Server error", error);
      res.status(500).json({
        success: false,
        message: "deleteComment Server error",
        error,
      });
    });
};

const getCommentById = (req, res) => {
  /* 
GET https://meraki-academy-project-5.onrender.com/comments/:comment_id
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
        message: "getCommentById Server error",
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
