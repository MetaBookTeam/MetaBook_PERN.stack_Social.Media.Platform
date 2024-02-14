const pool = require("../models/db");
//create comments
const CreateComments = (req, res) => {
  //endpoint and method (post,/CreateComment)
  const user_id = req.token.userId;
  const post_id = req.params.id;
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
        results: result.rows[0],
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
  //const userId = req.token.userId
  const post_id = req.params.id;
  //const{comment}=req.body
  //console.log(req.token.userId);

  pool
    .query(
      `SELECT * FROM comments
  WHERE post_id = $1 AND is_deleted = 0`,
      [post_id]
    )
    .then((result) => {
      if (result.rows.length) {
        return res.status(200).json({
          success: true,
          message: "All the comments",
          comment: result.rows,
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
/////////////////////////
const UpdateComments = (req, res) => {
  //const userId = req.token.userId
  const { comment_id } = req.params;
  const { comment } = req.body;
  const data = [comment, comment_id];
  pool
    .query(
      `UPDATE comments SET (user_id,post_id,comment,is_deleted) = (COALESCE( user_id),COALESCE( post_id),COALESCE($1, comment),COALESCE( user_id)) WHERE id = $2  RETURNING *;`,
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
//by id
const DeleteComments = (req, res) => {
  const { post_id } = req.params;
  pool
    .query(`UPDATE comments SET is_deleted = 1 WHERE post_id = $1`, [post_id])
    .then((result) => {
      return res.status(200).json({
        success: true,
        message: `Comments with id: ${post_id} deleted successfully`,
        result,
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

const getCommentsById = (req, res) => {
  const { comment_id } = req.params;
  pool
    .query(`SELECT * FROM comments  WHERE is_deleted = 0 AND id=$1 `, [
      comment_id,
    ])
    .then((result) => {
      if (result.rows.length) {
        return res.status(200).json({
          success: true,
          message: `The comment with id: ${comment_id}`,
          result: result.rows,
        });
      } else {
        throw new Error("Error happened while getting comments");
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

const UpdateCommentsById = (req, res) => {
  const { comment_id } = req.params;
  const { comment } = req.body;
  const data = [comment, comment_id];
  pool
    .query(
      `UPDATE comments SET comment =COALESCE ($1,comment) WHERE id = $2 RETURNING *;`,
      data
    )
    .then((result) => {
      if (result.rows.length !== 0) {
        return res.status(200).json({
          success: true,
          message: `Comment with id: ${comment_id} updated successfully`,
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

module.exports = {
  CreateComments,
  DeleteComments,
  UpdateCommentsById,
  getCommentsByPostId,
  UpdateComments,
  getCommentsById,
};
