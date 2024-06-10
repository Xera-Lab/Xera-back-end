
const cases = require(`${process.cwd()}/db/models/doctor/cases`);
const services = require(`${process.cwd()}/db/models/services/services`);
const caseStatus = require(`${process.cwd()}/db/models/doctor/caseStatus`);
const { doctor } = require(`${process.cwd()}/db/models/doctor/doctor`);

const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);


const getAllCases = catchAsync(async (req, res, next) => {

    const casesData = await cases.findAll({
        include: [
            {
                model: services,
                as: 'servicesType'
            },
            {
                model: caseStatus,
                as: 'status'
            },
            {
                model: doctor,
                as: 'doctor'
            }
        ],

        order: [['updatedAt', 'DESC']],
    });

    if (!casesData) {
        return next(new AppError('Cases not found', 404));
    }

    const jsonDate = casesData.map(element => element.toJSON());

    jsonDate.forEach(element => {
        if (element) {

            delete element.createdAt;
            delete element.updatedAt;
            delete element.deletedAt;
        }
        if (jsonDate.services) {
            delete jsonDate.services.createdAt;
            delete jsonDate.services.updatedAt;
            delete jsonDate.services.deletedAt;
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
        }
    });

    res.status(200).json({
        status: 'success',
        data: jsonDate
    });
});

module.exports = getAllCases;