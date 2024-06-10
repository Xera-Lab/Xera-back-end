
const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);
const roles = require(`${process.cwd()}/db/models/auth/role`);

const createRole = catchAsync(async (req, res, next) => {

    const body = req.body;


    if (Object.keys(body).length === 0) {
        return next(new AppError('Request body is empty', 400));
    }

    const role = await roles.findOne({
        where: {
            name: body.name
        }
    })

    if (role) {
        return next(new AppError('Role already exists', 400));
    }

    const newRole = await roles.create({
        name: body.name
    });

    const result = newRole.toJSON();
    return res.status(201).json({
        status: 'success',
        data: result,
    });
});


module.exports = createRole;