const getAllCases = require(`${process.cwd()}/modules/cases/api/v1/controllers/getAllCases`);
const submitNewCase = require(`${process.cwd()}/modules/cases/api/v1/controllers/submitNewCase`);
const getCaseById = require(`${process.cwd()}/modules/cases/api/v1/controllers/getCaseById`);
const deleteCase = require(`${process.cwd()}/modules/cases/api/v1/controllers/deleteCase`);
const assignCase = require(`${process.cwd()}/modules/cases/api/v1/controllers/assignCase`);
const startWorkOnCase = require(`${process.cwd()}/modules/cases/api/v1/controllers/startWorkOnCase`);
const startCaseReview = require(`${process.cwd()}/modules/cases/api/v1/controllers/startCaseReview`);
const requestCaseChanges = require(`${process.cwd()}/modules/cases/api/v1/controllers/requestCaseChanges`);
const sendCaseToReview = require(`${process.cwd()}/modules/cases/api/v1/controllers/sendCaseToReview`);
const finishCase = require(`${process.cwd()}/modules/cases/api/v1/controllers/finishCase`);
const uploadCaseFiles = require(`${process.cwd()}/modules/cases/api/v1/controllers/uploadCaseFiles`);
const caseDownloadUrl = require(`${process.cwd()}/modules/cases/api/v1/controllers/caseDownloadUrl`);
const assignCaseToSupervisor = require(`${process.cwd()}/modules/cases/api/v1/controllers/assignCaseToSupervisor`);
const getCasesCountByStatus = require(`${process.cwd()}/modules/cases/api/v1/controllers/getCasesCountByStatus`);
const doctorApprove = require(`${process.cwd()}/modules/cases/api/v1/controllers/doctorApprove`);
const doctorRequestCaseChanges = require(`${process.cwd()}/modules/cases/api/v1/controllers/doctorRequestCaseChanges`);

const verifyPermision = require(`${process.cwd()}/utils/middleware/authorization/verifyPermision`);
const upload = require(`${process.cwd()}/modules/cases/api/v1/middleware/upload`);

const express = require('express');
const casesRouter = express.Router();



// casesRouter.route('/get_all_cases').get( verifyPermision('get_all_cases'), getAllCases);
casesRouter.route('/get-all-cases').get(getAllCases);
casesRouter.route('/submit-case').post(submitNewCase);
casesRouter.route('/get-cases-count').get(getCasesCountByStatus);

casesRouter.route('/:caseId').get(getCaseById);
casesRouter.route('/:caseId').delete(deleteCase);
casesRouter.route('/:caseId/upload').post(upload.single('file'), uploadCaseFiles);
casesRouter.route('/download').post(caseDownloadUrl);
casesRouter.route('/:caseId/assign').post(assignCase);
casesRouter.route('/:caseId/assign-supervisor').post(assignCaseToSupervisor);
casesRouter.route('/:caseId/start-work').post(startWorkOnCase);
casesRouter.route('/:caseId/send-to-review').post(upload.single('file'), sendCaseToReview);
// casesRouter.route('/:caseId/send-to-review').post( sendCaseToReview);
casesRouter.route('/:caseId/start-review').post(startCaseReview);
casesRouter.route('/:caseId/request-changes').post(requestCaseChanges);
casesRouter.route('/:caseId/finish-case').post(finishCase);
casesRouter.route('/:caseId/approve').post(doctorApprove);
casesRouter.route('/:caseId/doctor-request-changes').post(doctorRequestCaseChanges);


module.exports = casesRouter;