const express = require('express');
const caseStatusRouter = express.Router();

//! ======= [Controllers] =========
const createCaseStatus = require(`${process.cwd()}/modules/admin/api/v1/controllers/case_status/createCaseStatus`);
const updateCaseStatus = require(`${process.cwd()}/modules/admin/api/v1/controllers/case_status/updateCaseStatus`);
const deleteCaseStatus = require(`${process.cwd()}/modules/admin/api/v1/controllers/case_status/deleteCaseStatus`);
const getAllCaseStatus = require(`${process.cwd()}/modules/admin/api/v1/controllers/case_status/getAllCaseStatus`);

//! ======= [Middleware] =========
const verifyToken = require(`${process.cwd()}/utils/middleware/authentication/verifyToken`);
const verifyPermision = require(`${process.cwd()}/utils/middleware/authorization/verifyPermision`);


// caseStatusRouter.route('/case-status').post(verifyToken, verifyPermision('create_case_status'), createCaseStatus);
// caseStatusRouter.route('/case-status/:id').patch(verifyToken, verifyPermision('update_case_status'), updateCaseStatus);
// caseStatusRouter.route('/case-status/:id').delete(verifyToken, verifyPermision('delete_case_status'), deleteCaseStatus);
// caseStatusRouter.route('/case-status').get(verifyToken, verifyPermision('get_all_case_statuss'), getAllCaseStatus);
caseStatusRouter.route('/case-status').post(verifyToken, createCaseStatus);
caseStatusRouter.route('/case-status/:id').patch(verifyToken, updateCaseStatus);
caseStatusRouter.route('/case-status/:id').delete(verifyToken, deleteCaseStatus);
caseStatusRouter.route('/case-status').get(verifyToken, getAllCaseStatus);


module.exports = caseStatusRouter;