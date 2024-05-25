const getAllCases = require(`${process.cwd()}/customer/api/v1/controllers/cases/getAllCases`);
const verifyToken = require(`${process.cwd()}/utils/middleware/authentication/verifyToken`);
const verifyPermision = require(`${process.cwd()}/utils/middleware/authorization/verifyPermision`);

const express = require('express');
const casesRouter = express.Router();



casesRouter.route('/get_all_cases').get(verifyToken, verifyPermision, getAllCases);


module.exports = casesRouter;