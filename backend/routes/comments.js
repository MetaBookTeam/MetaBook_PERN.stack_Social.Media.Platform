const express = require("express");

//* controllers
const {
  CreateComments,
  getComments,
  UpdateComments,
  DeleteComments,
  getCommentsById,
  UpdateCommentsById,
} = require("../controllers/Comments");

const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

//@ add authentication, authorization to all requests
//* Create comments router
const commentsRouter = express.Router();

//* endpoint for the POST request
commentsRouter.post("/",authentication,CreateComments);

//* endpoint for the GET request
commentsRouter.get("/",authentication,getComments);
commentsRouter.get("/comments/:id",authentication, getCommentsById);

//* endpoint for the PUT request
commentsRouter.put("/",authentication,UpdateComments);
commentsRouter.put("/comments/:id",authentication,UpdateCommentsById);

//* endpoint for the DELETE request
commentsRouter.delete("/",authentication,DeleteComments);

module.exports = commentsRouter;
