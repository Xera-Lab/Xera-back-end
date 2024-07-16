
const usersOtp = require(`${process.cwd()}/db/models/auth/usersOtp`);
const authUser = require(`${process.cwd()}/db/models/auth/authUser`);
const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);
const { OtpTypes } = require(`${process.cwd()}/utils/constants/enums`);


const sendOtpEmail = require(`${process.cwd()}/modules/auth/services/sendOtpEmail`);


const sendOtp = catchAsync(async (req, res, next) => {


    if (Object.keys(req.body).length === 0) {
        return next(new AppError('Request body is empty', 400));
    }

    const { email, otpType } = req.body;

    if (!email) {
        return next(new AppError('Email is required', 400));
    }


    if (!otpType) {
        return next(new AppError('Otp type is required', 400));
    }


    const authUserData = await authUser.findOne({
        where: {
            email
        },
    });

    if (otpType === OtpTypes.REGISTER) {
        if (authUserData) {
            return next(new AppError('User already exists', 400));
        }
    } else {
        if (!authUserData) {
            return next(new AppError('User not found', 404));
        }
    }

    const otpUser = await usersOtp.findOne({
        where: {
            email: email,
            otpType: otpType
        },
    });


    if (otpUser) {
        if (otpUser.expireAt > new Date()) {
            return next(new AppError('OTP already sent', 400));
        }

        if (otpUser.counter > 3) {
            return next(new AppError('OTP limit exceeded', 400));
        }
    }


    const otp = Math.floor(100000 + Math.random() * 900000);

    console.log(otp);

    // await sendOtpEmail(email, otp);

    if (otpUser) {
        otpUser.otp = otp;
        otpUser.expireAt = new Date(Date.now() + 1 * 60 * 1000);
        otpUser.counter = otpUser.counter + 1;

        await otpUser.save();
    } else {
        const otpData = await usersOtp.create({
            email: email,
            otp: otp,
            otpType: otpType,
            expireAt: new Date(Date.now() + 1 * 60 * 1000),
        });

        if (!otpData) {
            return next(new AppError('Failed to create otp', 400));
        }
    }




    return res.status(200).json({
        status: 'success',
    });
});

module.exports = sendOtp;