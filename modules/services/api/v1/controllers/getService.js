
const service = require(`${process.cwd()}/db/models/services/services`);

const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);



const getService = catchAsync(async (req, res, next) => {


    const serviceSearchKey = req.params.id;

    var exsistingService;

    const intKey = parseInt(serviceSearchKey);

    if (intKey.toString() == 'NaN') {
        exsistingService = await service.findOne({
            where: {
                searchName: serviceSearchKey.toLowerCase(),
            }
        })
    } else {
        exsistingService = await service.findByPk(parseInt(serviceSearchKey));
    }

    if (!exsistingService) {
        return next(new AppError('Service dose not exists', 404));
    }

    const result = exsistingService.toJSON();


    return res.status(200).json({
        status: 'success',
        data: result,
    });
});

module.exports = getService;