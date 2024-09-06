const express = require('express');
const caseStatusRouter = express.Router();

//! ======= [Controllers] =========
const createCaseStatus = require(`${process.cwd()}/modules/admin/api/v1/controllers/case_status/createCaseStatus`);
const updateCaseStatus = require(`${process.cwd()}/modules/admin/api/v1/controllers/case_status/updateCaseStatus`);
const deleteCaseStatus = require(`${process.cwd()}/modules/admin/api/v1/controllers/case_status/deleteCaseStatus`);
const getAllCaseStatus = require(`${process.cwd()}/modules/admin/api/v1/controllers/case_status/getAllCaseStatus`);

//! ======= [Middleware] =========
const verifyPermision = require(`${process.cwd()}/utils/middleware/authorization/verifyPermision`);


// caseStatusRouter.route('/case-status').post( verifyPermision('create_case_status'), createCaseStatus);
// caseStatusRouter.route('/case-status/:id').patch( verifyPermision('update_case_status'), updateCaseStatus);
// caseStatusRouter.route('/case-status/:id').delete( verifyPermision('delete_case_status'), deleteCaseStatus);
// caseStatusRouter.route('/case-status').get( verifyPermision('get_all_case_statuss'), getAllCaseStatus);
caseStatusRouter.route('/case-status').post(createCaseStatus);
caseStatusRouter.route('/case-status/:id').patch(updateCaseStatus);
caseStatusRouter.route('/case-status/:id').delete(deleteCaseStatus);
caseStatusRouter.route('/case-status').get(getAllCaseStatus);


module.exports = caseStatusRouter;