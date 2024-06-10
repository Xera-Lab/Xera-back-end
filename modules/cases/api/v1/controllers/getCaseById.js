
const cases = require(`${process.cwd()}/db/models/doctor/cases`);
const services = require(`${process.cwd()}/db/models/services/services`);
const caseStatus = require(`${process.cwd()}/db/models/doctor/caseStatus`);
const { doctor } = require(`${process.cwd()}/db/models/doctor/doctor`);
const { authUser } = require(`${process.cwd()}/db/models/auth/authUser`);

const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);


const getCaseById = catchAsync(async (req, res, next) => {

    const caseId = req.params.caseId;

    if (!caseId) {
        return next(new AppError('Case id is required', 400));
    }

    const caseData = await cases.findByPk(caseId, {
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
                as: 'doctor',
            }
        ],
    });

    if (!caseData) {
        return next(new AppError('Cases not found', 404));
    }

    const jsonDate = caseData.toJSON();

    if (jsonDate) {

        delete jsonDate.createdAt;
        delete jsonDate.updatedAt;
        delete jsonDate.deletedAt;
    }
    if (jsonDate.services) {
        delete jsonDate.services.createdAt;
        delete jsonDate.services.updatedAt;
        delete jsonDate.services.deletedAt;
    }

    if (jsonDate.status) {
        delete jsonDate.status.createdAt;
        delete jsonDate.status.updatedAt;
        delete jsonDate.status.deletedAt;
    }

    if (jsonDate.doctor) {
        delete jsonDate.doctor.createdAt;
        delete jsonDate.doctor.updatedAt;
        delete jsonDate.doctor.deletedAt;
        delete jsonDate.doctor.password;
    }


    res.status(200).json({
        status: 'success',
        data: jsonDate
    });
});

module.exports = getCaseById;