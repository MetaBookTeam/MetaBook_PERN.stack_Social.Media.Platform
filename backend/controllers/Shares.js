const pool = require("../models/db");

const getShareByPostId = (req, res) => {
  const { post_id } = req.params;
  pool
    .query(
      `SELECT * 
FROM shares
INNER JOIN posts ON shares.post_id = posts.id
WHERE is_deleted = 0 AND shares.post_id = $1;`,
      [post_id]
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "get share successfully",
        result: result.rows,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error,
      });
    });
};
const createShareByPostId = (req, res) => {
  const { post_id } = req.params;
  const { userId } = req.token;
  const { content } = req.body;

  pool
    .query(
      ` INSERT INTO shares (post_id, user_id, content)
        VALUES ($1, $2, $3)
        RETURNING *;`,
      [post_id, userId, content]
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "create share successfully",
        result: result.rows,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error,
      });
    });
};
const softDeleteShare = (req, res) => {
  const { share_id } = req.params;

  pool
    .query(
      ` UPDATE shares
    SET is_deleted = true
    WHERE id = $1;`,
      [share_id]
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "delete share successfully",
        result: result.rows,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error,
      });
    });
};

const getAllSharesByUserId = async (req, res) => {
  const { user_id } = req.params;
  const placeholder = [user_id];

  try {
    const result = await pool.query(
      `SELECT	shares.post_id,shares.user_id,posts.id,posts.content,posts.photo_url,shares.contentAdd FROM shares
      right join posts ON posts.id = shares.post_id
      WHERE shares.user_id =$1
    `,
      placeholder
    );

    res.status(200).json({
      success: true,
      message: "getAllSharesByUserId",
      result: result.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "getAllSharesByUserId Server Error",
      error,
    });
  }
};
module.exports = {
  getShareByPostId,
  createShareByPostId,
  softDeleteShare,
  getAllSharesByUserId,
};
