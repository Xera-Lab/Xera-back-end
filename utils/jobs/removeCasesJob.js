const cron = require('node-cron');

// Schedule a task to run every minute
const removeCases = () => {
    cron.schedule('* * * * *', () => {
        console.log('Running a task every minute in removeCasesJob.js');
        // Place your task logic here
    });
};

module.exports = removeCases;