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
        message: "get share succesfully",
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
  const { user_id } = req.token.id;
  const { content } = req.body;
  pool
    .query(
      ` INSERT INTO shares (post_id, user_id,content)
        VALUES ($1,$2,$3)
        RETURNING id=$1;`,
      [post_id, user_id, content]
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
        message: "delete share succesfully",
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
  console.log("hell");
  try {
    const resu = await pool.query(
      `SELECT	shares.post_id,shares.user_id,posts.id,posts.content,posts.photo_url,shares.contentAdd FROM shares
      right join posts ON posts.id = shares.post_id
      WHERE shares.user_id =$1
    `,
      placeholder
    );

    res.status(200).json({
      success: true,
      message: "all shares",
      result: resu.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
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
