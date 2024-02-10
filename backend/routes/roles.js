const express = require("express");

//controllers
const {
  createNewRole,
  createNewPermission,
  createNewRolePermission,
} = require("../controllers/roles");

const rolesRouter = express.Router();

rolesRouter.post("/", createNewRole);
rolesRouter.post("/permission", createNewPermission);
rolesRouter.post("/role_permission", createNewRolePermission);

module.exports = rolesRouter;
