const rolesRouter = require('./api/v1/routes/roles/rolesRouter');
const permissionsRouter = require('./api/v1/routes/permissions/permissionsRouter');
const caseStatusRouter = require('./api/v1/routes/case_status/caseStatus');

const express = require('express');
const router = express.Router();


router.use('/admin', rolesRouter, permissionsRouter, caseStatusRouter);



module.exports = router;