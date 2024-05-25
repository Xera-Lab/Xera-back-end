const users = require(`${process.cwd()}/db/models/users`);
const roles = require(`${process.cwd()}/db/models/roles`);
const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);
const generatToken = require(`${process.cwd()}/customer/utils/generateJwtToken`);


const signUp = catchAsync(async (req, res, next) => {
    const body = req.body;


    if (Object.keys(body).length === 0) {
        return next(new AppError('Request body is empty', 400));
    }


    const role = await roles.findByPk(body.roleId);

    if (!role) {
        return next(new AppError('Role not found', 404));
    }

    const newUser = await users.create({
        roleId: role.id,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phoneNumber: body.phoneNumber,
        password: body.password,
        confirmPassword: body.confirmPassword,
    });


    if (!newUser) {
        return next(new AppError('Failed to create user', 400));
    }

    const result = newUser.toJSON();

    delete result.password;
    delete result.deletedAt;
    delete result.updatedAt;
    delete result.createdAt;

    const token = generatToken({
        id: newUser.id,
        role: role.id
    });


    return res.status(201).json({
        status: 'success',
        tokens: {
            accessToken: token
        },
        data: result,
    });
});
module.exports = signUp;