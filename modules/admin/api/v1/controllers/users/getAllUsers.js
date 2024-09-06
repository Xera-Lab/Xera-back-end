
const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);
const { admin } = require(`${process.cwd()}/db/models/admin/admin`);
const roles = require(`${process.cwd()}/db/models/auth/role`);

const { superAdmin } = require(`${process.cwd()}/db/models/admin/superAdmin`);
const { getPaginationData } = require(`${process.cwd()}/utils/pagination/getPaginationData`);
const authUser = require(`${process.cwd()}/db/models/auth/authUser`);

const url = require('url');

const getAllUsers = catchAsync(async (req, res, next) => {

    const queryParams = url.parse(req.url, true).query;

    const response = await admin.findAndCountAll({
        limit: queryParams.size,
        offset: ((queryParams.page - 1) * queryParams.size) || 0,
        include: [
            {
                model: authUser,
                as: 'authUser',
                required: true,
                include: [
                    {
                        model: roles,
                        as: 'role',
                        where: queryParams.role ? {
                            name: queryParams.role
                        } : null,
                        required: true,
                        attributes: ['name', 'displayName'],

                    },
                ],
                attributes: ['id', 'firstName', 'lastName', 'email'],
            }
        ],
        attributes: ['userId'],
        order: [['updatedAt', 'DESC']],
    });

    var pagination = getPaginationData(response.count, queryParams.page || 1, queryParams.size);

    return res.status(200).json({
        status: 'success',
        data: response.rows,
        pagination: pagination,
    });
});



module.exports = getAllUsers;
