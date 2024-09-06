
const jwt = require('jsonwebtoken');
const role = require(`${process.cwd()}/db/models/auth/role`);
const permission = require(`${process.cwd()}/db/models/auth/permission`);
const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);

const verifyPermision = (requiredPermission) => {
    return catchAsync(async (req, res, next) => {


        const token = req.headers.authorization.split(' ')[1];
        const tokenDetail = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const roleName = tokenDetail.roleName;


        const isExists = await role.findOne({
            where: {
                name: roleName
            },
            include: [
                {
                    model: permission,
                    where: {
                        name: requiredPermission,
                    },
                    required: true
                },
            ]
        });

        console.log(isExists);

        if (!!isExists) {
            return next();
        } else {

            return next(new AppError('You don\'t have permission', 403));
        }

    });
};

module.exports = verifyPermision;