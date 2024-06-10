
const service = require(`${process.cwd()}/db/models/services/services`);

const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);



const addNewService = catchAsync(async (req, res, next) => {

    if (Object.keys(req.body).length === 0) {
        return next(new AppError('Request body is empty', 400));
    }


    const exsistingService = await service.findOne({
        where: {
            name: req.body.name
        },
    });


    if (exsistingService) {
        return next(new AppError('Service already exists', 400));
    }

    const serviceData = await service.create({
        ...req.body
    });

    const result = serviceData.toJSON();


    delete result.deletedAt;
    delete result.updatedAt;
    delete result.createdAt;



    return res.status(200).json({
        status: 'success',
        data: result,
    });
});

module.exports = addNewService;