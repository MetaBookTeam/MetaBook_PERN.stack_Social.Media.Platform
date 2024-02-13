const express = require("express");

//* controllers
const {
  createNewRole,
  createNewPermission,
  createNewRolePermission,
} = require("../controllers/roles");

const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

//* Create roles router
const rolesRouter = express.Router();

//* endpoint for the POST request
rolesRouter.post(
  "/",
  authentication,
  authorization("MANAGE_ROLES"),
  createNewRole
);

rolesRouter.post(
  "/permission",
  authentication,
  authorization("MANAGE_ROLES"),
  createNewPermission
);

rolesRouter.post(
  "/role_permission",
  authentication,
  authorization("MANAGE_ROLES"),
  createNewRolePermission
);

module.exports = rolesRouter;
