const express = require('express');
const rolesRouter = express.Router();

//! ======= [Controllers] =========
const createRole = require(`${process.cwd()}/admin/src/api/v1/controllers/roles/createRole`);
const updateRole = require(`${process.cwd()}/admin/src/api/v1/controllers/roles/updateRole`);
const deleteRole = require(`${process.cwd()}/admin/src/api/v1/controllers/roles/deleteRole`);
const getAllRoles = require(`${process.cwd()}/admin/src/api/v1/controllers/roles/getAllRoles`);

//! ======= [Middleware] =========
const verifyToken = require(`${process.cwd()}/utils/middleware/authentication/verifyToken`);
const verifyPermision = require(`${process.cwd()}/utils/middleware/authorization/verifyPermision`);


rolesRouter.route('/').post(verifyToken, verifyPermision, createRole);
rolesRouter.route('/:id').post(verifyToken, verifyPermision, updateRole);
rolesRouter.route('/:id').delete(verifyToken, deleteRole);
rolesRouter.route('/').get(verifyToken, verifyPermision, getAllRoles);


module.exports = rolesRouter;