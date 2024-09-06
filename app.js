require('dotenv').config();
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

// CORS configuration
const corsOptions = {
    origin: "https://stag.xeralab.com",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS", // Ensure all methods are allowed
    allowedHeaders: "Content-Type,Authorization", // Specify allowed headers
    credentials: true, // If you want to send cookies or auth headers
    optionsSuccessStatus: 204 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};


app.use(cors(corsOptions), express.json());


initJobs();



app.use('/api/v1', authRoutes);

app.use('/api/v1', casesRoutes, adminRoutes, servicesRouter, doctorRouter);



app.use(globalErrorHandler);


// Check if .env file exists and have APP_PORT defined in it else use 3000
const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
    console.log('Server up and running', PORT);
});