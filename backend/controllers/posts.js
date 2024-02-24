const pool = require("../models/db");

const createNewPost = async (req, res) => {
  /* 
POST http://localhost:5000/posts

{
    "content": "description",
    "photo_url":"imageLink"
}
*/

  const { userId } = req.token;
  const { content, photo_url } = req.body;

  const placeholder = [userId, content, photo_url];

  try {
    const newPost = await pool.query(
      `INSERT INTO posts (user_id,content,photo_url) VALUES ($1,$2,$3) RETURNING *`,
      placeholder
    );
    const placeholder2 = [newPost.rows[0].id];
    console.log(placeholder2);
    const newLike = await pool.query(
      ` INSERT INTO
      posts_likes (user_id, post_id)
    VALUES
      (1, $1) RETURNING *;`,
      placeholder2
    );

    res.status(200).json({
      success: true,
      message: "Post created successfully",
      result: newPost.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
      error,
    });
  }
};

const getAllPost = async (req, res) => {
  /* 
GET http://localhost:5000/posts

*/
  try {
    const post = await pool.query(
      `with cte_likes as (
        select post_id, count(*) as total_likes
        from posts_likes
        group by post_id
        ), 
        cte_comments as (
          select post_id, count(*) as total_comments
          from comments
          group by post_id
          ), 
        cte_shares as (
          select post_id, count(*) as total_shares
          from shares
          group by post_id
          )
      select p.id,p.created_at,users.image,users.user_name,
      p.content,
      coalesce(l.total_likes, 0) as likes, 
      coalesce(c.total_comments, 0) as comments,
      coalesce(s.total_shares, 0) as shares
      from posts p
      full outer join users on users.id=p.user_id
      left join cte_likes l
        on p.id = l.post_id
      left join cte_comments c
        on p.id = c.post_id
        left join cte_shares s
        on p.id = s.post_id`
    );

    res.status(200).json({
      success: true,
      message: "getAllPost done",
      result: post.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
      error,
    });
  }
};

const getYourPosts = async (req, res) => {
  /* 
GET http://localhost:5000/posts/profile
*/

  const { userId } = req.token;

  const placeholder = [userId];

  try {
    const post = await pool.query(
      `with cte_likes as (
        select post_id, count(*) as total_likes
        from posts_likes
        group by post_id
        ), 
        cte_comments as (
          select post_id, count(*) as total_comments
          from comments
          group by post_id
          ), 
        cte_shares as (
          select post_id, count(*) as total_shares
          from shares
          group by post_id
          )
      select p.id, 
      p.content,
      coalesce(l.total_likes, 0) as likes, 
      coalesce(c.total_comments, 0) as comments,
      coalesce(s.total_shares, 0) as shares
      from posts p
      left join cte_likes l
        on p.id = l.post_id
      left join cte_comments c
        on p.id = c.post_id
        left join cte_shares s
        on p.id = s.post_id WHERE user_id=$1
      `,
      placeholder
    );
    res.status(200).json({
      success: true,
      message: "getYourPosts done",
      result: post.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};

const getPostByUserId = async (req, res) => {
  /* 
GET http://localhost:5000/posts/:user_id
     Another friend profile
*/

  const { user_id } = req.params;

  const placeholder = [user_id];

  try {
    const post = await pool.query(
      `with cte_likes as (
        select post_id, count(*) as total_likes
        from posts_likes
        group by post_id
        ), 
        cte_comments as (
          select post_id, count(*) as total_comments
          from comments
          group by post_id
          ), 
        cte_shares as (
          select post_id, count(*) as total_shares
          from shares
          group by post_id
          )
      select p.id, 
      p.content,
      coalesce(l.total_likes, 0) as likes, 
      coalesce(c.total_comments, 0) as comments,
      coalesce(s.total_shares, 0) as shares
      from posts p
      left join cte_likes l
        on p.id = l.post_id
      left join cte_comments c
        on p.id = c.post_id
        left join cte_shares s
        on p.id = s.post_id WHERE p.user_id = $1 AND is_deleted = 0`,
      placeholder
    );
    res.status(200).json({
      success: true,
      message: "getYourPosts done",
      result: post.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};

const updatePostById = async (req, res) => {
  /*
PUT http://localhost:5000/posts/:post_id

{
    "content": "description",
    "photo_url": "new post photo URL"
}
*/
  const { userId } = req.token;
  const { post_id } = req.params;
  const { content, photo_url } = req.body;

  const placeholder = [post_id, content, userId, photo_url];

  try {
    const updatePost = await pool.query(
      `UPDATE posts
      SET (content, photo_url) 
      = ( COALESCE($2, content), COALESCE($4, photo_url) ) 
          WHERE id=$1 
          AND user_id=$3 RETURNING *;`,
      placeholder
    );
    res.status(200).json({
      success: true,
      message: "updatePostById done",
      result: updatePost.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "updatePostById Server error",
      error,
    });
  }
};

const deletePostById = async (req, res) => {
  /*
DELETE http://localhost:5000/posts/:post_id



//@
 ! make it soft delete ==> UPDATE is_deleted = 1 
*/

  const { userId } = req.token;
  const { post_id } = req.params;

  const placeholder = [post_id, userId];

  try {
    const deletePost = await pool.query(
      `UPDATE posts SET is_deleted=1 WHERE id=$1 AND user_id=$2 RETURNING *;`,
      placeholder
    );
    res.status(200).json({
      success: true,
      message: "Deleted successfully",
      result: deletePost,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "deletePostById server error",
      error,
    });
  }
};

module.exports = {
  createNewPost,
  getAllPost,
  getYourPosts,
  getPostByUserId,
  updatePostById,
  deletePostById,
};
