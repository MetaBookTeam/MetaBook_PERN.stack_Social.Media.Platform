const express = require("express");

//* controllers
const {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUserById,
  softDeleteUserById,
  hardDeleteUserById,
  getAllFriends,
  addFriend
} = require("../controllers/users");

const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

//* Create users router
const usersRouter = express.Router();

//* endpoint for the POST request
usersRouter.post("/register", register);
usersRouter.post("/login", login);
// friend
usersRouter.post(
  "/friends/:friend_id",
  authentication,
  addFriend
);

//* endpoint for the GET request
usersRouter.get(
  "/",
  authentication,
  authorization("MANAGE_USERS"),
  getAllUsers
);
// friend
usersRouter.get(
  "/friends",
  authentication,
  getAllFriends
);

usersRouter.get(
  "/:user_id",
  authentication,
  authorization("MANAGE_USERS"),
  getUserById
);

//* endpoint for the PUT request
usersRouter.put(
  "/:user_id",
  authentication,
  authorization("MANAGE_USERS"),
  updateUserById
);

//* endpoint for the DELETE request
usersRouter.delete(
  "/:user_id",
  authentication,
  authorization("MANAGE_USERS"),
  softDeleteUserById
);

usersRouter.delete(
  "/delete/:user_id",
  authentication,
  authorization("MANAGE_USERS"),
  hardDeleteUserById
);

module.exports = usersRouter;
