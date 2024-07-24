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

const verifyToken = require(`${process.cwd()}/utils/middleware/authentication/verifyToken`);
const verifyPermision = require(`${process.cwd()}/utils/middleware/authorization/verifyPermision`);
const upload = require(`${process.cwd()}/modules/cases/api/v1/middleware/upload`);

const express = require('express');
const casesRouter = express.Router();



// casesRouter.route('/get_all_cases').get(verifyToken, verifyPermision('get_all_cases'), getAllCases);
casesRouter.route('/get-all-cases').get(verifyToken, getAllCases);
casesRouter.route('/submit-case').post(verifyToken, submitNewCase);
casesRouter.route('/get-cases-count').get(verifyToken, getCasesCountByStatus);

casesRouter.route('/:caseId').get(verifyToken, getCaseById);
casesRouter.route('/:caseId').delete(verifyToken, deleteCase);
casesRouter.route('/:caseId/upload').post(verifyToken, upload.single('file'), uploadCaseFiles);
casesRouter.route('/:caseId/download').post(verifyToken, caseDownloadUrl);
casesRouter.route('/:caseId/assign').post(verifyToken, assignCase);
casesRouter.route('/:caseId/assign-supervisor').post(verifyToken, assignCaseToSupervisor);
casesRouter.route('/:caseId/start-work').post(verifyToken, startWorkOnCase);
casesRouter.route('/:caseId/send-to-review').post(verifyToken, upload.single('file'), sendCaseToReview);
// casesRouter.route('/:caseId/send-to-review').post(verifyToken, sendCaseToReview);
casesRouter.route('/:caseId/start-review').post(verifyToken, startCaseReview);
casesRouter.route('/:caseId/request-changes').post(verifyToken, requestCaseChanges);
casesRouter.route('/:caseId/finish-case').post(verifyToken, finishCase);


module.exports = casesRouter;