const sequelize = require(`${process.cwd()}/config/database`);
const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);

const roles = require(`${process.cwd()}/db/models/auth/role`);
const authUser = require(`${process.cwd()}/db/models/auth/authUser`);
const { createAdmin } = require(`${process.cwd()}/db/models/admin/admin`);



const createUser = catchAsync(async (req, res, next) => {
    const body = req.body;


    if (Object.keys(body).length === 0) {
        return next(new AppError('Request body is empty', 400));
    }

    const role = await roles.findByPk(body.roleId);

    if (!role || role.name === 'DOCTOR') {
        return next(new AppError('Invalid role', 400));
    }



    const transaction = await sequelize.transaction();

    try {

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



        const { newUserDate } = await createAdmin(
            {
                authId: newUser.id,
                roleName: role.name,
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


        return res.status(201).json({
            status: 'success',
            data: result,
        });

    } catch (error) {
        await transaction.rollback();
        console.log(error);
        return next(error);
    }





});
module.exports = createUser;