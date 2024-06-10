const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);
const permissions = require(`${process.cwd()}/db/models/auth/permission`);

const updatePermission = catchAsync(async (req, res, next) => {

    const permissionId = req.params.id;;

    const body = req.body;

    if (!permissionId) {
        return next(new AppError('Permission id is required', 400));
    }

    const permission = await permissions.findByPk(permissionId);

    if (!permission) {
        return next(new AppError('Permission dose not exists', 404));
    }

    if (body.name) {
        permission.name = body.name;
    }

    if (body.displayName) {
        permission.displayName = body.displayName;
    }

    if (body.description) {
        permission.description = body.description;
    }

    await permission.save();

    return res.status(200).json({
        status: 'success',
        message: 'Permission updated successfully'
    });
});


module.exports = updatePermission;