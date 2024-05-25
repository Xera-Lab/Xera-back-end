const rolesRouter = require('./api/v1/routes/roles/rolesRouter');

const express = require('express');
const router = express.Router();


router.use('/roles', rolesRouter);


module.exports = router;