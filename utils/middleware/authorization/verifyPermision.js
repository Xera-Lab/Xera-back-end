
const jwt = require('jsonwebtoken');
const roles = require(`${process.cwd()}/db/models/roles`);
const permissions = require(`${process.cwd()}/db/models/permissions`);
const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);

const verifyPermision = catchAsync(async (req, res, next) => {


    const token = req.headers.authorization.split(' ')[1];
    const tokenDetail = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const url = req.url;
    const role = tokenDetail.role;


    const isExists = await roles.findOne({
        where: {
            id: role
        },
        include: [
            {
                model: permissions,
                where: {
                    name: url,  // Ensuring the permission exists
                },
                required: true // Only return roles that have the specified permission
            },
        ]
    },
    );
    console.log(isExists);
    if (!!isExists) {
        return next();
    } else {

        return next(new AppError('Permission not found', 404));
    }

});

module.exports = verifyPermision;