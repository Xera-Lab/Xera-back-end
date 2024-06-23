const sendEmail = require(`${process.cwd()}/utils/email/sendEmail`);

const sendOtpEmail = async (email, otp) => {

    const subject = 'Welcome to Xera Lab';

    const html = `
        <p>You can use the following OTP to verify your email</p>
        <h1>${otp}</h1>
        <p>OTP is valid for 5 minutes</p>
        <p>Please do not share this OTP with anyone</p>
        <p>Thank you</p>
    `;

    await sendEmail(email, subject, html);
};

module.exports = sendOtpEmail;