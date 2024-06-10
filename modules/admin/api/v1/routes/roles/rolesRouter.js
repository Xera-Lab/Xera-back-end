const express = require('express');
const rolesRouter = express.Router();

//! ======= [Controllers] =========
const createRole = require(`${process.cwd()}/modules/admin/api/v1/controllers/roles/createRole`);
const updateRole = require(`${process.cwd()}/modules/admin/api/v1/controllers/roles/updateRole`);
const deleteRole = require(`${process.cwd()}/modules/admin/api/v1/controllers/roles/deleteRole`);
const getAllRoles = require(`${process.cwd()}/modules/admin/api/v1/controllers/roles/getAllRoles`);

//! ======= [Middleware] =========
const verifyToken = require(`${process.cwd()}/utils/middleware/authentication/verifyToken`);
const verifyPermision = require(`${process.cwd()}/utils/middleware/authorization/verifyPermision`);


rolesRouter.route('/roles').post(verifyToken, verifyPermision('create_role'), createRole);
rolesRouter.route('/roles/:id').patch(verifyToken, verifyPermision('update_role'), updateRole);
rolesRouter.route('/roles/:id').delete(verifyToken, verifyPermision('delete_role'), deleteRole);
rolesRouter.route('/roles').get(verifyToken, verifyPermision('get_all_roles'), getAllRoles);


module.exports = rolesRouter;