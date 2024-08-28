require('dotenv').config({ path: `${process.cwd()}/.env` });
const adminRoutes = require('./modules/admin/admin');
const casesRoutes = require('./modules/cases/cases');
const authRoutes = require('./modules/auth/auth');
const servicesRouter = require('./modules/services/services');
const doctorRouter = require('./modules/doctor/doctor');
const globalErrorHandler = require('./utils/errors/errorController');
const initJobs = require('./utils/jobs/initJobs');


const express = require('express');
const cors = require('cors');

const app = express();


app.use(cors());
app.use(express.json());

// initJobs();


app.use('/api/v1/', casesRoutes, adminRoutes, authRoutes, servicesRouter, doctorRouter);



app.use(globalErrorHandler);


// Check if .env file exists and have APP_PORT defined in it else use 4000
const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
    console.log('Server up and running', PORT);
});