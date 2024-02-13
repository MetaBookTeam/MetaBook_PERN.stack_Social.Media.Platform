const express = require("express");

//controllers
const {
  createNewRole,
  createNewPermission,
  createNewRolePermission,
  getAllRoles,
  getAllPermissions,
  getAllRolePermission,
} = require("../controllers/roles");

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
