const express = require("express");

const {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/users");
const authentication = require("../middlewares/authentication");
// const authorization = require("../middlewares/authorization");

const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);

usersRouter.get(
  "/",
  authentication,
  //   authorization("MANAGE-USERS"),
  getAllUsers
);

usersRouter.get(
  "/:id",
  authentication,
  //   authorization("MANAGE-USERS"),
  getUserById
);

usersRouter.put(
  "/:id",
  authentication,
  //   authorization("MANAGE-USERS"),
  updateUserById
);

usersRouter.delete(
  "/:id",
  authentication,
  //   authorization("MANAGE-USERS"),
  deleteUserById
);

module.exports = usersRouter;
