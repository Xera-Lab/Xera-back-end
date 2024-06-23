
const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);
const { admin } = require(`${process.cwd()}/db/models/admin/admin`);
const roles = require(`${process.cwd()}/db/models/auth/role`);

const { superAdmin } = require(`${process.cwd()}/db/models/admin/superAdmin`);
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
                        attributes: ['name'],
                    },
                ],
                attributes: ['id', 'firstName', 'lastName', 'email'],
            }
        ],
        attributes: ['userId'],
        order: [['updatedAt', 'DESC']],
    });


    var nextPage = Number(queryParams.page) + 1;
    var prevPage = queryParams.page - 1;

    if (nextPage > response.count) {
        nextPage = null;
    }

    if (prevPage === 0) {
        prevPage = null;
    }



    return res.status(200).json({
        status: 'success',
        data: response.rows,
        pagination: {
            total: response.count,
            nextPage: nextPage,
            prevPage: prevPage,
        }
    });
});



module.exports = getAllUsers;
