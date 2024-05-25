const bcrypt = require('bcrypt');

const users = require(`${process.cwd()}/db/models/users`);
const roles = require(`${process.cwd()}/db/models/roles`);
const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);
const generatToken = require(`${process.cwd()}/customer/utils/generateJwtToken`);


const login = catchAsync(async (req, res, next) => {

    if (Object.keys(req.body).length === 0) {
        return next(new AppError('Request body is empty', 400));
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Email and password are required', 400));
    }

    const user = await users.findOne({
        where: {
            email
        },
        include: [{
            model: roles,
            as: 'role',
        }],
    });

    if (!user) {
        return next(new AppError('User not found', 404));
    }

    if (!(await bcrypt.compare(password, user.password))) {
        return next(new AppError('Incorrect password', 401));
    }
    console.log(user.role.id);
    const token = generatToken({
        id: user.id,
        role: user.role.id,
    });



    const result = user.toJSON();

    delete result.password;
    delete result.deletedAt;
    delete result.role.id;



    return res.status(200).json({
        status: 'success',
        tokens: {
            accessToken: token
        },
        data: result,
    });
});

module.exports = login;