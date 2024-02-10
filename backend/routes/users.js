const express = require("express");

const { register, login } = require("../controllers/users");

const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);

module.exports = usersRouter;
