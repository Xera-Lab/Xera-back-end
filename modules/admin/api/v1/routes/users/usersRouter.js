//! ======= [Controllers] =========
//? Roles
const createRole = require(`${process.cwd()}/admin/src/api/v1/controllers/roles/createRole`);
const updateRole = require(`${process.cwd()}/admin/src/api/v1/controllers/roles/updateRole`);
const deleteRole = require(`${process.cwd()}/admin/src/api/v1/controllers/roles/deleteRole`);
const getAllRoles = require(`${process.cwd()}/admin/src/api/v1/controllers/roles/getAllRoles`);
//? Permissions
const createPermission = require(`${process.cwd()}/admin/src/api/v1/controllers/permission/createPermission`);

//! ======= [Middleware] =========
const verifyToken = require(`${process.cwd()}/utils/middleware/authentication/verifyToken`);
const verifyPermision = require(`${process.cwd()}/utils/middleware/authorization/verifyPermision`);

const express = require('express');
const usersRouter = express.Router();

//? Roles
// usersRouter.route('/role').post(verifyToken, verifyPermision, createRole);
// usersRouter.route('/role/:id').post(verifyToken, verifyPermision, updateRole);
// usersRouter.route('/role/:id').post(verifyToken, verifyPermision, deleteRole);
// usersRouter.route('/role').get(verifyToken, verifyPermision, getAllRoles);

// usersRouter.route('/permission').post(verifyToken, verifyPermision, createPermission);



module.exports = usersRouter;