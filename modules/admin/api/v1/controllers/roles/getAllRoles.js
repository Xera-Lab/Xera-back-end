const { Op } = require('sequelize');

const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);
const roles = require(`${process.cwd()}/db/models/auth/role`);

const getAllRoles = catchAsync(async (req, res, next) => {

    const roleList = await roles.findAll(
        {
            where: {

                name: {
                    [Op.notIn]: ['SUPERADMIN', 'DOCTOR']
                }
            }
        }
    );


    if (!roleList) {
        return next(new AppError('No roles found', 404));
    }


    return res.status(200).json({
        status: 'success',
        data: roleList
    });
});


module.exports = getAllRoles;