const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);
const permissions = require(`${process.cwd()}/db/models/permissions`);


const createPermission = catchAsync(async (req, res, next) => {

    const body = req.body;


    if (Object.keys(body).length === 0) {
        return next(new AppError('Request body is empty', 400));
    }

    const permission = await permissions.findOne({
        where: {
            name: body.name
        }
    })

    if (permission) {
        return next(new AppError('Permission already exists', 400));
    }

    const newPermission = await permissions.create({
        name: body.name,
        description: body.description,
    });

    const result = newPermission.toJSON();

    return res.status(201).json({
        status: 'success',
        data: result,
    });
});


module.exports = createPermission;
