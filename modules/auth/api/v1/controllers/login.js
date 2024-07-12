const bcrypt = require('bcryptjs');

const authUser = require(`${process.cwd()}/db/models/auth/authUser`);
const doctor = require(`${process.cwd()}/db/models/doctor/doctor`);
const roles = require(`${process.cwd()}/db/models/auth/role`);
const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);
const generatToken = require(`${process.cwd()}/utils/token/generateJwtToken`);
const { getAdmin } = require(`${process.cwd()}/db/models/admin/admin`);
const { getSuperAdmin } = require(`${process.cwd()}/db/models/admin/superAdmin`);
const { getDoctor } = require(`${process.cwd()}/db/models/doctor/doctor`);


const roleLoginHandlers = {
    1: getSuperAdmin,
    5: getDoctor,
};

const login = catchAsync(async (req, res, next) => {


    if (Object.keys(req.body).length === 0) {
        return next(new AppError('Request body is empty', 400));
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Email and password are required', 400));
    }

    const authUserData = await authUser.findOne({
        where: {
            email
        },
        include: [{
            model: roles,
            as: 'role',
        }],
    });


    if (!authUserData) {
        return next(new AppError('User not found', 404));
    }

    if (req.headers['x-admin-key'] && req.headers['x-admin-key'] === process.env.ADMIN_KEY) {
        if (authUserData.role.name === 'DOCTOR') {
            return next(new AppError('Invalid role', 400));
        }
    } else {
        if (authUserData.role.name !== 'DOCTOR') {
            return next(new AppError('User not found', 404));
        }
    }


    if (!(await bcrypt.compare(password, authUserData.password))) {
        return next(new AppError('Incorrect password', 401));
    }

    console.log(authUserData.role.id);
    console.log(roleLoginHandlers[authUserData.role.id] || getAdmin);

    const { userData, accessToken } = await (roleLoginHandlers[authUserData.role.id] || getAdmin)(authUserData);



    const result = {
        ...authUserData.toJSON(),
        ...userData.toJSON(),
        ...{ role: authUserData.role.name },
    };

    delete result.password;
    delete result.deletedAt;
    delete result.updatedAt;
    delete result.createdAt;
    delete result.id;
    delete result.authId;
    delete result.roleId;


    return res.status(200).json({
        status: 'success',
        tokens: {
            accessToken: accessToken
        },
        data: result,
    });
});

module.exports = login;