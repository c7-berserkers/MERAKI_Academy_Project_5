const express = require("express");

const roleRouter = express.Router();

const {
  createRole,
  createPermission,
  createRolePermission,
} = require("../controllers/roles");

//end point

roleRouter.post("", createRole);
roleRouter.post("/permission", createPermission);
roleRouter.post("/rolePermission", createRolePermission);

module.exports = roleRouter;
