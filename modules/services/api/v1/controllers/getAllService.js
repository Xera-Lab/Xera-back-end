
const service = require(`${process.cwd()}/db/models/services/services`);

const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);
const { getPaginationData } = require(`${process.cwd()}/utils/pagination/getPaginationData`);

const url = require('url');



const getAllService = catchAsync(async (req, res, next) => {

    const queryParams = url.parse(req.url, true).query;
    var whereCondition = {

    };
    if (req.headers['x-admin-key'] && req.headers['x-admin-key'] === process.env.ADMIN_KEY) {

        whereCondition = null;
    } else {

        whereCondition = {
            isActive: true
        };
    }

    const servicesList = await service.findAndCountAll({
        limit: queryParams.size,
        offset: ((queryParams.page - 1) * queryParams.size) || 0,
        where: whereCondition
    });

    const pagination = getPaginationData(servicesList.count, queryParams.page, queryParams.size);

    const result = servicesList.rows.map((service) => {
        const jsonService = service.toJSON();

        delete jsonService.createdAt;
        delete jsonService.updatedAt;
        delete jsonService.deletedAt;

        return jsonService;
    });



    return res.status(200).json({
        status: 'success',
        data: result,
        pagination: pagination,
    });
});

module.exports = getAllService;