const express = require("express");

//* controllers
const {
  createNewRole,
  createNewPermission,
  createNewRolePermission,
  getAllRoles,
  getAllPermissions,
  getAllRolePermission,
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
  "/permissions",
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

//* endpoint for the GET request
rolesRouter.get(
  "/",
  authentication,
  authorization("MANAGE_ROLES"),
  getAllRoles
);

rolesRouter.get(
  "/permissions",
  authentication,
  authorization("MANAGE_ROLES"),
  getAllPermissions
);

rolesRouter.get(
  "/role_permission",
  authentication,
  authorization("MANAGE_ROLES"),
  getAllRolePermission
);

module.exports = rolesRouter;
