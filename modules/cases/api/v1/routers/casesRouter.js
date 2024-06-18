const getAllCases = require(`${process.cwd()}/modules/cases/api/v1/controllers/getAllCases`);
const submitNewCase = require(`${process.cwd()}/modules/cases/api/v1/controllers/submitNewCase`);
const getCaseById = require(`${process.cwd()}/modules/cases/api/v1/controllers/getCaseById`);
const deleteCase = require(`${process.cwd()}/modules/cases/api/v1/controllers/deleteCase`);
const assignCase = require(`${process.cwd()}/modules/cases/api/v1/controllers/assignCase`);
const uploadCaseFiles = require(`${process.cwd()}/modules/cases/api/v1/controllers/uploadCaseFiles`);
const caseDownloadUrl = require(`${process.cwd()}/modules/cases/api/v1/controllers/caseDownloadUrl`);

const verifyToken = require(`${process.cwd()}/utils/middleware/authentication/verifyToken`);
const verifyPermision = require(`${process.cwd()}/utils/middleware/authorization/verifyPermision`);
const upload = require(`${process.cwd()}/modules/cases/api/v1/middleware/upload`);

const express = require('express');
const casesRouter = express.Router();



// casesRouter.route('/get_all_cases').get(verifyToken, verifyPermision('get_all_cases'), getAllCases);
casesRouter.route('/get-all-cases').get(verifyToken, getAllCases);
casesRouter.route('/submit-case').post(verifyToken, submitNewCase);
casesRouter.route('/:caseId').get(verifyToken, getCaseById);
casesRouter.route('/:caseId').delete(verifyToken, deleteCase);
casesRouter.route('/:caseId/upload').post(verifyToken, upload.single('file'), uploadCaseFiles);
casesRouter.route('/:caseId/download').post(verifyToken, caseDownloadUrl);
casesRouter.route('/:caseId/assign').post(verifyToken, assignCase);


module.exports = casesRouter;