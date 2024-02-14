const pool = require("../models/db");

// 1- this function createNewPage

//POST http://localhost:5000/pages/

const createNewPage = (req, res) => {
  const user_id = req.token.userId;
  const { page_name } = req.body;
  const query = `INSERT INTO pages (user_id,page_name) VALUES ($1,$2) RETURNING *;`;
  const data = [user_id, page_name];
  if (!page_name) {
    res.status(404).json({
      success: false,
      message: "Enter Page Name",
    });
  }
  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Page Created",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};

// 2- this function getAllPages

//GET  http://localhost:5000/pages/

const getAllPages = (req, res) => {
  const query = `SELECT * FROM pages WHERE is_deleted=0`;
  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All pages",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};
// 3- this function getPageByUserId

//GET  http://localhost:5000/pages/id

const getPageByUser = (req, res) => {
  const user_id = req.token.userId;
  const query = `SELECT * FROM pages WHERE user_id =$1 AND is_deleted=0;`;
  const data = [user_id];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).json({
          success: false,
          message: `The UserId: ${user_id} has no pages`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `All the pages for the user: ${user_id}`,
          result: result.rows,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};

// 4- this function getPageById

//GET  http://localhost:5000/pages/search_1/:id

const getPageById = (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM pages WHERE id=$1 `;
  const data = [id];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).json({
          success: false,
          message: `There is no ${id} with is page`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `The page with id: ${id}`,
          result: result.rows,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};

// 5- this function updatePageById.

//PUT  http://localhost:5000/pages/:id

const updatePageById = (req, res) => {
  const { id } = req.params;
  const { page_name } = req.body;
  const query = `UPDATE pages SET page_name= $1 WHERE id=$2 RETURNING *;`;
  const data = [id, page_name];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).json({
          success: false,
          message: `There is no ${id} with is page`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Updated Successfully",
          result: result.rows,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};

// 6- this function  deletePageById.

//DELETE  http://localhost:5000/pages/:id
const deletePageById = (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM pages WHERE id=$1 `;
  const data = [id];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length) {
        res.status(404).json({
          success: false,
          message: `There is no ${id} with is page`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `Page with id: ${id} deleted successfully`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

// 7- this function  deletePageByUser.

//DELETE  http://localhost:5000/pages/:id/user

const deletePageByUser = (req, res) => {
  const user_id = req.token.id;
  const query = `DELETE FROM pages WHERE user_id=$1 `;
  const data = [user_id];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).json({
          success: false,
          message: `There is no ${user_id} with is page`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `Page with User: ${user_id} deleted successfully`,
        });
      }
    })
    .catch((err) => {
      es.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

module.exports = {
  createNewPage,
  getAllPages,
  getPageByUser,
  getPageById,
  updatePageById,
  deletePageById,
  deletePageByUser,
};
