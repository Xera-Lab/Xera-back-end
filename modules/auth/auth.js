const authRouter = require(`${process.cwd()}/modules/auth/api/v1/routes/authRouter`);

const express = require('express');
const router = express.Router();


router.use('/auth', authRouter);


module.exports = router;