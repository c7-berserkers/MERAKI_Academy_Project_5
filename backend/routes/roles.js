const express = require("express");

const roleRouter = express.Router();



//end point

roleRouter.post("", createRole );
roleRouter.post("/permission", createPermission );
roleRouter.post("/rolePermission", createRolePermission );




module.exports = roleRouter;
