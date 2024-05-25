
const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);
const roles = require(`${process.cwd()}/db/models/roles`);

const getAllRoles = catchAsync(async (req, res, next) => {

    const roleList = await roles.findAll();

    if (!roleList) {
        return next(new AppError('Role dose not exists', 404));
    }


    return res.status(200).json({
        status: 'success',
        data: roleList
    });
});


module.exports = getAllRoles;