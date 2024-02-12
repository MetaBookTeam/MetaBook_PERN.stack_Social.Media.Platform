

/* // READ operation
async function getCommentLikeById(id) {
  const query = {
    text: 'SELECT * FROM comment_likes WHERE id = $1',
    values: [id],
  };

  try {
    const res = await client.query(query);
    console.log('Comment like found:', res.rows[0]);
  } catch (err) {
    console.error('Error executing query', err);
  }
}

// UPDATE operation
async function updateCommentLike(id, user_id, comment_id) {
  const query = {
    text: 'UPDATE comment_likes SET user_id = $2, comment_id = $3 WHERE id = $1 RETURNING *',
    values: [id, user_id, comment_id],
  };

  try {
    const res = await client.query(query);
    console.log('Comment like updated:', res.rows[0]);
  } catch (err) {
    console.error('Error executing query', err);
  }
}

// DELETE operation
async function deleteCommentLike(id) {
  const query = {
    text: 'DELETE FROM comment_likes WHERE id = $1 RETURNING *',
    values: [id],
  };

  try {
    const res = await client.query(query);
    console.log('Comment like deleted:', res.rows[0]);
  } catch (err) {
    console.error('Error executing query', err);
  }
}

// Example usage
createCommentLike(1, 1); // Create a new comment like
getCommentLikeById(1); // Get the comment like with id 1
updateCommentLike(1, 2, 2); // Update the comment like with id 1
deleteCommentLike(1); // Delete the comment like with id 1
------------------------------------------------------------
const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');

const app = express();
const port = 3000;

// Connection information
const client = new Client({
  user: 'your_username',
  host: 'localhost',
  database: 'your_database_name',
  password: 'your_password',
  port: 5432, // Default PostgreSQL port
});

// Connect to the database
client.connect();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to create a new comment like
app.post('/comment-likes', async (req, res) => {
  const { user_id, comment_id } = req.body;
  
  const query = {
    text: 'INSERT INTO comment_likes(user_id, comment_id) VALUES($1, $2) RETURNING *',
    values: [user_id, comment_id],
  };

  try {
    const result = await client.query(query);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to get a comment like by ID
app.get('/comment-likes/:id', async (req, res) => {
  const id = req.params.id;

  const query = {
    text: 'SELECT * FROM comment_likes WHERE id = $1',
    values: [id],
  };

  try {
    const result = await client.query(query);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Comment like not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to update a comment like
app.put('/comment-likes/:id', async (req, res) => {
  const id = req.params.id;
  const { user_id, comment_id } = req.body;

  const query = {
    text: 'UPDATE comment_likes SET user_id = $2, comment_id = $3 WHERE id = $1 RETURNING *',
    values: [id, user_id, comment_id],
  };

  try {
    const result = await client.query(query);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Comment like not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to delete a comment like
app.delete('/comment-likes/:id', async (req, res) => {
  const id = req.params.id;

  const query = {
    text: 'DELETE FROM comment_likes WHERE id = $1 RETURNING *',
    values: [id],
  };

  try {
    const result = await client.query(query);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Comment like not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
 */