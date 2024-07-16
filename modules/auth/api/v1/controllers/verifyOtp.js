
const usersOtp = require(`${process.cwd()}/db/models/auth/usersOtp`);
const authUser = require(`${process.cwd()}/db/models/auth/authUser`);
const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);
const { OtpTypes } = require(`${process.cwd()}/utils/constants/enums`);




const verifyOtp = catchAsync(async (req, res, next) => {


    if (Object.keys(req.body).length === 0) {
        return next(new AppError('Request body is empty', 400));
    }

    const { email, otp, otpType } = req.body;


    const otpUser = await usersOtp.findOne({
        where: {
            email: email,
            otpType: otpType,
        },
    });



    if (!otpUser) {
        return next(new AppError('This email didn\'t receive any otp', 400));
    }

    if (otpUser) {
        if (otpUser.expireAt < new Date()) {
            return next(new AppError('OTP expired', 400));
        }

        if (otpUser.otp !== otp) {
            return next(new AppError('Invalid otp', 400));
        }
    }

    otpUser.isVerified = true;
    await otpUser.save();

    return res.status(200).json({
        status: 'success',
    });
});

module.exports = verifyOtp;