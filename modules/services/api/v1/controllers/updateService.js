
const service = require(`${process.cwd()}/db/models/services/services`);

const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);



const updateService = catchAsync(async (req, res, next) => {


    const serviceId = req.params.id;

    const body = req.body;

    if (Object.keys(req.body).length === 0) {
        return next(new AppError('Request body is empty', 400));
    }


    const exsistingService = await service.findByPk(serviceId);


    if (!exsistingService) {
        return next(new AppError('Service dose not exists', 404));
    }

    if (body.name) {
        exsistingService.name = body.name;
    }
    if (body.description) {
        exsistingService.description = body.description;
    }
    if (body.price) {
        exsistingService.price = body.price;
    }
    if (body.isActive !== undefined) {
        exsistingService.isActive = body.isActive;
    }

    await exsistingService.save();


    return res.status(200).json({
        status: 'success',
        data: 'Service updated successfully',
    });
});

module.exports = updateService;