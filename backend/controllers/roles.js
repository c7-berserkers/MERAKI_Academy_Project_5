const { pool } = require("../models/db");

const createRole = (req, res) => {
  const { role } = req.body;
  const data = [role];
  const query = `INSERT INTO roles (role) VALUES ($1) RETURNING  *;`;
  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Role created successfully",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const createPermission = (req, res) => {
  const { permission } = req.body;
  const data = [permission];
  const query = `INSERT INTO permissions (permission) VALUES ($1) RETURNING *;`;
  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Permission created successfully",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const createRolePermission = (req, res) => {
  const { role_id, permission_id } = req.body;
  console.log(role_id, permission_id);
  const data = [role_id, permission_id];
  const query = `INSERT INTO role_permission (role_id , permission_id ) VALUES ($1 , $2) RETURNING *;`;
  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Role permission created successfully",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

module.exports = {
  createRole,
  createPermission,
  createRolePermission,
};
