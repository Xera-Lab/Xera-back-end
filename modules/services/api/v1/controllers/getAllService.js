
const service = require(`${process.cwd()}/db/models/services/services`);

const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);



const getAllService = catchAsync(async (req, res, next) => {



    const servicesList = await service.findAll({
        where: {
            isActive: true
        }
    });


    const result = servicesList.map((service) => {
        const jsonService = service.toJSON();

        delete jsonService.createdAt;
        delete jsonService.updatedAt;
        delete jsonService.deletedAt;

        return jsonService;
    });



    return res.status(200).json({
        status: 'success',
        data: result,
    });
});

module.exports = getAllService;