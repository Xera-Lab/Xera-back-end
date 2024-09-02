const bcrypt = require('bcryptjs');

const sequelize = require(`${process.cwd()}/config/database`);
const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);

const roles = require(`${process.cwd()}/db/models/auth/role`);
const authUser = require(`${process.cwd()}/db/models/auth/authUser`);
const usersOtp = require(`${process.cwd()}/db/models/auth/usersOtp`);
const { OtpTypes } = require(`${process.cwd()}/utils/constants/enums`);



const changePassword = catchAsync(async (req, res, next) => {
    const body = req.body;


    if (Object.keys(body).length === 0) {
        return next(new AppError('Request body is empty', 400));
    }

    const role = await roles.findByPk(5);

    if (!role || role.name !== 'DOCTOR') {
        return next(new AppError('Invalid role', 400));
    }

    const userData = await authUser.findOne({
        where: {
            email: body.email
        }
    });

    if (!userData) {
        return next(new AppError('User dose not exists', 404));
    }

    if (!(await bcrypt.compare(body.oldPassword, userData.password))) {
        return next(new AppError('Incorrect old password', 401));
    }



    const transaction = await sequelize.transaction();

    try {


        const otpUser = await usersOtp.findOne({
            where: {
                email: body.email,
                otpType: OtpTypes.CHANGEPASSWORD,
            },
            transaction
        });

        if (otpUser == null) {
            throw new AppError('Something went wrong!', 400);
        }

        if (!otpUser.isVerified) {
            throw new AppError('Something went wrong!', 400);
        }

        userData.password = body.password;
        userData.confirmPassword = body.confirmPassword;

        await userData.save({ transaction });

        await transaction.commit();

        await otpUser.destroy();

        return res.status(201).json({
            status: 'success',
            message: 'Password reset successfully',

        });

    } catch (error) {
        console.log(error);
        await transaction.rollback();
        return next(error);
    }





});
module.exports = changePassword;