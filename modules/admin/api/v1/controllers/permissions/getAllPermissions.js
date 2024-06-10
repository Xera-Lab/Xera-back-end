const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);
const permissions = require(`${process.cwd()}/db/models/auth/permission`);

const getAllPermissions = catchAsync(async (req, res, next) => {

    const permissionList = await permissions.findAll();


    if (!permissionList) {
        return next(new AppError('No permissions found', 404));
    }


    return res.status(200).json({
        status: 'success',
        data: permissionList
    });
});


module.exports = getAllPermissions;