const express = require("express");
// Import pages controller

const {
  createNewPage,
  getAllPages,
  getPageByUser,
  getPageById,
  updatePageById,
  deletePageById,
  deletePageByUser,
} = require("../controllers/pages");

const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const { deletePageLikeById } = require("../controllers/pagesLikes");

// Create pages router
const pagesRouter = express.Router();

// endpoint for the POST request
pagesRouter.post("/",authentication,createNewPage)

// endpoint for the GET request
pagesRouter.get("/",getAllPages)
pagesRouter.get("/user",authentication,getPageByUser)
pagesRouter.get("/search_1/:id",getPageById)
pagesRouter.get("/likes",authentication,createNewPage)

// endpoint for the PUT request
pagesRouter.put("/:id",authentication,updatePageById)

// endpoint for the DELETE request ///
pagesRouter.delete("/:id",authentication,deletePageById)
pagesRouter.delete("/:id/user",authentication,deletePageByUser)
pagesRouter.delete("/likes/:id",authentication,deletePageLikeById)

module.exports = pagesRouter;
