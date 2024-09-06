const casesRouter = require('./api/v1/routers/casesRouter');
const verifyToken = require(`${process.cwd()}/utils/middleware/authentication/verifyToken`);

const express = require('express');
const router = express.Router();


router.use('/cases', verifyToken, casesRouter);


module.exports = router;