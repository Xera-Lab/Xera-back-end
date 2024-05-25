const authRouter = require('./api/v1/routers/auth/authRouter');
const casesRouter = require('./api/v1/routers/cases/casesRouter');

const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    res.send('Customer page');
});

router.use('/auth', authRouter);
router.use('/cases', casesRouter);


module.exports = router;