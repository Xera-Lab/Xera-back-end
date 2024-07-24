
const cases = require(`${process.cwd()}/db/models/doctor/cases`);
const services = require(`${process.cwd()}/db/models/services/services`);
const caseStatus = require(`${process.cwd()}/db/models/doctor/caseStatus`);
const { doctor } = require(`${process.cwd()}/db/models/doctor/doctor`);
const { getUserIdFromToken } = require(`${process.cwd()}/utils/token/getIdFromToken`);
const { getPaginationData } = require(`${process.cwd()}/utils/pagination/getPaginationData`);



const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);
const url = require('url');


const getAllCases = catchAsync(async (req, res, next) => {

    const queryParams = url.parse(req.url, true).query;

    const userId = getUserIdFromToken(req.headers.authorization.split(' ')[1]);

    if (userId === null) {
        return next(new AppError('Invalid token', 401));
    }

    var whereCondition = null;

    if (userId.split('_')[0] === 'DOCTOR') {
        whereCondition = {
            doctorId: userId,
        };
    } else if (userId.split('_')[0] === 'SUPER' || userId.split('_')[0] === 'ADMIN') {
        whereCondition = null;
    } else if (userId.split('_')[0] === 'SUPERVISOR') {
        whereCondition = {
            supervisorId: userId,
        };
    } else {
        whereCondition = {
            assigneeId: userId,
        };
    }



    const response = await cases.findAndCountAll({
        limit: queryParams.size,
        offset: ((queryParams.page - 1) * queryParams.size) || 0,
        include: [
            {
                model: services,
                as: 'servicesType'
            },
            {
                model: caseStatus,
                as: 'status',
                where: queryParams.status && queryParams.status !== 'ALL' ? { status: queryParams.status, } : null,
            },
            {
                model: doctor,
                as: 'doctor'
            }
        ],
        where: whereCondition,
        order: [['updatedAt', 'DESC']],
    });

    if (!response) {
        return next(new AppError('Cases not found', 404));
    }

    const pagination = getPaginationData(response.count, queryParams.page, queryParams.size)
    const jsonDate = response.rows.map(element => element.toJSON());

    jsonDate.forEach(element => {
        if (element) {

            delete element.createdAt;
            delete element.updatedAt;
            delete element.deletedAt;
        }

        if (element.servicesType) {
            delete element.servicesType.createdAt;
            delete element.servicesType.updatedAt;
            delete element.servicesType.deletedAt;

        }
        if (element.status) {
            delete element.status.createdAt;
            delete element.status.updatedAt;
            delete element.status.deletedAt;
        }

        if (element.doctor) {
            delete element.doctor.createdAt;
            delete element.doctor.updatedAt;
            delete element.doctor.deletedAt;
            delete element.doctor.authId;
        }
    });

    res.status(200).json({
        status: 'success',
        data: jsonDate,
        pagination: pagination,
    });
});

module.exports = getAllCases;