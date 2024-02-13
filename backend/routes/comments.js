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
commentsRouter.post("/", CreateComments);

//* endpoint for the GET request
commentsRouter.get("/", getComments);
commentsRouter.get("/comments/:id", getCommentsById);

//* endpoint for the PUT request
commentsRouter.put("/", UpdateComments);
commentsRouter.put("/comments/:id", UpdateCommentsById);

//* endpoint for the DELETE request
commentsRouter.delete("/", DeleteComments);

module.exports = commentsRouter;
