const transporter = require(`${process.cwd()}/config/emailConfig`);

const sendEmail = async (to, subject, html) => {
    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to: to,                       // List of receivers
        subject: subject,             // Subject line
        html: html                    // HTML body (optional)
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = sendEmail;