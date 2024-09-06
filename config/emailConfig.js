const nodemailer = require('nodemailer');
const { port } = require('pg/lib/defaults');
const { local } = require('./environment');

const mailerEnveroment = {
    local: {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Your email address
            pass: process.env.EMAIL_PASS  // Your email password or app password
        },
    },
    stag: {
        host: 'mail.xeralab.com',
        port: 465,
        auth: {
            user: process.env.EMAIL_USER, // Your email address
            pass: process.env.EMAIL_PASS  // Your email password or app password
        },
    },
    prod: {
        host: 'mail.xeralab.com',
        port: 465,
        auth: {
            user: process.env.EMAIL_USER, // Your email address
            pass: process.env.EMAIL_PASS  // Your email password or app password
        },
    },
};
const env = process.env.NODE_ENV || 'local';

const mailer = nodemailer.createTransport(mailerEnveroment[env]);

// Verify the connection configuration
mailer.verify((error, success) => {
    if (error) {
        console.error('Error configuring email mailer:', error);
    } else {
        console.log('Email mailer configured successfully:', success);
    }
});

module.exports = mailer;