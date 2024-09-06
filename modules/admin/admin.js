const rolesRouter = require('./api/v1/routes/roles/rolesRouter');
const permissionsRouter = require('./api/v1/routes/permissions/permissionsRouter');
const caseStatusRouter = require('./api/v1/routes/case_status/caseStatus');
const usersRouter = require('./api/v1/routes/users/usersRouter');
const verifyToken = require(`${process.cwd()}/utils/middleware/authentication/verifyToken`);

const express = require('express');
const router = express.Router();


router.use('/admin', verifyToken, rolesRouter, permissionsRouter, caseStatusRouter, usersRouter);



module.exports = router;