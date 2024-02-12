const express = require("express");
// Import pages controller
const { createNewPage, getAllPages, getPageByUser, getPageById, updatePageById, deletePageById, deletePageByUser, } = require("../controllers/pages");

// Create pages router
const pagesRouter = express.Router();

// endpoint for the POST request
pagesRouter.post("/",createNewPage)

// endpoint for the GET request
pagesRouter.get("/",getAllPages)
pagesRouter.get("/user",getPageByUser)
pagesRouter.get("/search_1/:id",getPageById)

// endpoint for the PUT request
pagesRouter.put("/:id",updatePageById)

// endpoint for the DELETE request ///
pagesRouter.delete("/:id",deletePageById)
pagesRouter.delete("/:id/user",deletePageByUser)

module.exports = pagesRouter;
