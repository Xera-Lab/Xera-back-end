const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);
const permissions = require(`${process.cwd()}/db/models/auth/permission`);

const deletePermission = catchAsync(async (req, res, next) => {

    const permissionId = req.params.id;

    if (!permissionId) {
        return next(new AppError('Permission id is required', 400));
    }

    const permission = await permissions.findByPk(permissionId);

    if (!permission) {
        return next(new AppError('Permission dose not exists', 404));
    }

    await permission.destroy();

    return res.status(200).json({
        status: 'success',
        message: 'Permission deleted successfully'
    });
});


module.exports = deletePermission;