const pool = require("../models/db");

const getShareByPostId = (req, res) => {};
const { post_id } = req.params;
pool
  .query(
    `SELECT shares.id AS share_id,
shares.user_id AS share_user_id,
shares.post_id,
posts.user_id AS post_user_id,
posts.page_id,
posts.content,
posts.photo_url,
posts.created_at,
posts.is_deleted
FROM shares
INNER JOIN posts ON shares.post_id = posts.id
WHERE shares.post_id = $1;`,
    [post_id]
  )
  .then((result) => {
    res.status(200).json({
      success: true,
      message: "get share succesfully",
      result: result.rows,
    });
  })
  .catch((error) => {
    res.status(500).json({
      success: false,
      message: "Server Error",
      errorr: errorrr.message,
    });
  });

const createShareByPostId = (req, res) => {};
//const {post_id}=req.params;
const { user_id } = req.token.id;
pool
  .query(
    ` INSERT INTO shares (post_id, user_id)
VALUES ($1, $2)
RETURNING id;`,
    [user_id]
  )
  .then((result) => {
    res.status(200).json({
      success: true,
      message: "create share succesfully",
      result: result.rows,
    });
  })
  .catch((error) => {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  });
const softDeleteShare = (req, res) => {
    const{share_id}=req.token.id
  pool.query(
    ` UPDATE shares
    SET is_deleted = true
    WHERE id = $1;`,
    [share_id]
  ).then((result)=>{
    res.status(200).json({
        success: true,
        message: "delete share succesfully",
        result: result.rows,
      });
  }).catch((error)=>{
    res.status(500).json({
        success: false,
        message: "Server Error",
        error: error,
      });
  })
};
module.exports = { getShareByPostId, createShareByPostId, softDeleteShare };