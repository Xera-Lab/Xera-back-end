
const service = require(`${process.cwd()}/db/models/services/services`);

const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);



const deleteService = catchAsync(async (req, res, next) => {


    const serviceId = req.params.id;

    const exsistingService = await service.findByPk(serviceId);


    if (!exsistingService) {
        return next(new AppError('Service dose not exists', 404));
    }


    await exsistingService.destroy();


    return res.status(200).json({
        status: 'success',
        data: 'Service deleted successfully',
    });
});

module.exports = deleteService;