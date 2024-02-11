const express = require("express");
//controllers
const { createNewPage, getAllPages } = require("../controllers/pages");

const pagesRouter = express.Router();

// usersRouter.post("/", createNewRole);
pagesRouter.post("/",createNewPage)
pagesRouter.get("/",getAllPages)

module.exports = pagesRouter;
