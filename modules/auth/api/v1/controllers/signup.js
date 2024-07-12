const sequelize = require(`${process.cwd()}/config/database`);
const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);

const roles = require(`${process.cwd()}/db/models/auth/role`);
const authUser = require(`${process.cwd()}/db/models/auth/authUser`);
const usersOtp = require(`${process.cwd()}/db/models/auth/usersOtp`);
const { createDoctor } = require(`${process.cwd()}/db/models/doctor/doctor`);

const sendWelcomeEmail = require(`${process.cwd()}/modules/auth/services/sendWelcomeEmail`);


const signUp = catchAsync(async (req, res, next) => {
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

    if (userData) {
        return next(new AppError('Email already exists', 400));
    }



    const transaction = await sequelize.transaction();

    try {


        const otpUser = await usersOtp.findOne({
            where: {
                email: body.email
            },
            transaction
        });

        if (otpUser == null) {
            throw new AppError('Something went wrong!', 400);
        }

        if (!otpUser.isVerified) {
            throw new AppError('Something went wrong!', 400);
        }

        const newUser = await authUser.create({

            roleId: role.id,
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: body.password,
            confirmPassword: body.confirmPassword,
        }, { transaction });

        if (!newUser) {
            return next(new AppError('Failed to create user', 400));
        }



        const { newUserDate, accessToken } = await createDoctor(
            {
                authId: newUser.id,
                roleName: role.name,
                phoneNumber: body.phoneNumber || null,
                dentalPracticeName: body.dentalPracticeName || null,
                practiceAddress: body.practiceAddress || null,
                specialty: body.specialty || null,
            },
            transaction,
        );

        if (!newUserDate) {
            return next(new AppError('Failed to create user', 400));
        }

        const result = {
            ...newUser.toJSON(),
            ...newUserDate.toJSON(),
            ...{
                role: role.name
            },
        }

        delete result.password;
        delete result.deletedAt;
        delete result.updatedAt;
        delete result.createdAt;
        delete result.id;
        delete result.authId;
        delete result.roleId;

        await transaction.commit();


        // try {
        //     sendWelcomeEmail({
        //         email: result.email,
        //         name: result.firstName + ' ' + result.lastName,
        //     });
        // } catch (err) {
        //     console.log(err);
        // }
        await otpUser.destroy();
        return res.status(201).json({
            status: 'success',
            tokens: {
                accessToken: accessToken
            },
            data: result,
        });

    } catch (error) {
        console.log(error);
        await transaction.rollback();
        return next(error);
    }





});
module.exports = signUp;