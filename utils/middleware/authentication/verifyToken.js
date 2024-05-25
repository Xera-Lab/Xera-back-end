const jwt = require('jsonwebtoken');
const users = require(`${process.cwd()}/db/models/users`);
const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);

const verifyToken = catchAsync(async (req, res, next) => {

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return next(new AppError('Invalid token', 401));
        }

        const tokenDetail = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!tokenDetail) {
            return next(new AppError('Invalid token', 401));
        }

        const user = await users.findByPk(tokenDetail.id);
        if (!user) {
            return next(new AppError('User not found', 404));
        }

        return next();
    } else {
        return next(new AppError('No token provided', 401));
    }
});

module.exports = verifyToken;