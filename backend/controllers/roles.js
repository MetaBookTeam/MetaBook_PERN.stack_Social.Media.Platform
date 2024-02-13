const pool = require("../models/db");

const createNewRole = (req, res) => {
  /* 
POST http://localhost:5000/roles/

{
    "role": "Admin2"
}
*/

  const { role } = req.body;

  const query = `INSERT INTO roles (role) VALUES ($1) RETURNING *;`;
  const data = [role];

  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Role created successfully",
        result: result.rows,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: `Server error`,
        error,
      });
    });
};

const createNewPermission = (req, res) => {
  /* 
POST http://localhost:5000/roles/permission

{
    "permission": "ADD_PAGE"
}
*/
  const { permission } = req.body;
  const query = `INSERT INTO permissions (permission) VALUES ($1) RETURNING *;`;
  const data = [permission];

  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Permission created successfully`,
        result: result.rows,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: `Server error`,
        error,
      });
    });
};

const createNewRolePermission = (req, res) => {
  /* 
POST http://localhost:5000/roles/role_permission/

{
    "role_id": 1,
    "permission_id": 7
}
*/
  const { role_id, permission_id } = req.body;
  const query = `
    INSERT INTO role_permission (role_id,permission_id) 
    VALUES ($1,$2) RETURNING *
    `;
  const data = [role_id, permission_id];

  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Role Permission created successfully`,
        result: result.rows,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: `Server error`,
        error,
      });
    });
};

const getAllRoles = (req, res) => {
  /* 
GET http://localhost:5000/roles/
*/

  const query = `SELECT * FROM roles;`;

  pool
    .query(query)
    .then((result) => {
      console.log("getAllRoles done");
      res.status(200).json({
        success: true,
        message: "getAllRoles done",
        result: result.rows,
      });
    })
    .catch((error) => {
      console.log(`getAllRoles Server error`);
      res.status(500).json({
        success: false,
        message: `getAllRoles Server error`,
        error,
      });
    });
};

const getAllPermissions = (req, res) => {
  /* 
GET http://localhost:5000/roles/permissions
*/

  const query = `SELECT * FROM permissions;`;

  pool
    .query(query)
    .then((result) => {
      console.log("getAllPermissions done");
      res.status(200).json({
        success: true,
        message: "getAllPermissions done",
        result: result.rows,
      });
    })
    .catch((error) => {
      console.log(`getAllPermissions Server error`);
      res.status(500).json({
        success: false,
        message: `getAllPermissions Server error`,
        error,
      });
    });
};

const getAllRolePermission = (req, res) => {
  /* 
GET http://localhost:5000/roles/role_permission
*/

  const query = `
  SELECT * 
  FROM role_permission
  FULL OUTER JOIN roles
  ON role_permission.role_id = roles.id
  FULL OUTER JOIN permissions
  ON role_permission.permission_id = permissions.id;
  `;

  pool
    .query(query)
    .then((result) => {
      console.log("getAllRolePermission done");
      res.status(200).json({
        success: true,
        message: "getAllRolePermission done",
        result: result.rows,
      });
    })
    .catch((error) => {
      console.log(`getAllRolePermission Server error`);
      res.status(500).json({
        success: false,
        message: `getAllRolePermission Server error`,
        error,
      });
    });
};

module.exports = {
  createNewRole,
  createNewPermission,
  createNewRolePermission,
  getAllRoles,
  getAllPermissions,
  getAllRolePermission,
};
