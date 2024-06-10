
const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);
const roles = require(`${process.cwd()}/db/models/auth/role`);

const deleteRole = catchAsync(async (req, res, next) => {

    const roleId = req.params.id;

    if (!roleId) {
        return next(new AppError('Role id is required', 400));
    }

    const role = await roles.findByPk(roleId);

    if (!role) {
        return next(new AppError('Role dose not exists', 404));
    }

    await role.destroy();

    return res.status(200).json({
        status: 'success',
        message: 'Role deleted successfully'
    });
});


module.exports = deleteRole;