const express = require('express');
const rolesRouter = express.Router();

//! ======= [Controllers] =========
const createRole = require(`${process.cwd()}/modules/admin/api/v1/controllers/roles/createRole`);
const updateRole = require(`${process.cwd()}/modules/admin/api/v1/controllers/roles/updateRole`);
const deleteRole = require(`${process.cwd()}/modules/admin/api/v1/controllers/roles/deleteRole`);
const getAllRoles = require(`${process.cwd()}/modules/admin/api/v1/controllers/roles/getAllRoles`);

//! ======= [Middleware] =========
const verifyPermision = require(`${process.cwd()}/utils/middleware/authorization/verifyPermision`);


rolesRouter.route('/roles').post(verifyPermision('create_role'), createRole);
rolesRouter.route('/roles/:id').patch(verifyPermision('update_role'), updateRole);
rolesRouter.route('/roles/:id').delete(verifyPermision('delete_role'), deleteRole);
rolesRouter.route('/roles').get(getAllRoles);


module.exports = rolesRouter;