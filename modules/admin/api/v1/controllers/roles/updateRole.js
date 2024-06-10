
const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);
const roles = require(`${process.cwd()}/db/models/auth/role`);

const updateRole = catchAsync(async (req, res, next) => {

    const roleId = req.params.id;;

    const body = req.body;

    if (!roleId) {
        return next(new AppError('Role id is required', 400));
    }

    const role = await roles.findByPk(roleId);

    if (!role) {
        return next(new AppError('Role dose not exists', 404));
    }

    role.name = body.name;

    await role.save();

    return res.status(200).json({
        status: 'success',
        message: 'Role updated successfully'
    });
});


module.exports = updateRole;