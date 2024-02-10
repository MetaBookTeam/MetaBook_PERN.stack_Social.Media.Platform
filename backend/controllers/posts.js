const pool = require("../models/db");

const createNewPost = async (req, res) => {
  const { user_id, content } = req.body;

  const placeholder = [user_id, content];
  try {
    const newPost = await pool.query(
      `INSERT INTO posts (user_id,content) VALUES ($1,$2) RETURNING *`,
      placeholder
    );
    console.log(newPost.rows);
    res.status(200).json({
      success: true,
      message: "Created successfully",
      res: newPost.rows,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "server error",
      res: error.message,
    });
  }
};

module.exports = {
  createNewPost,
};
