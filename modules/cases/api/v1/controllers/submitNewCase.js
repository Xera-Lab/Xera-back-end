
const cases = require(`${process.cwd()}/db/models/doctor/cases`);
const services = require(`${process.cwd()}/db/models/services/services`);
const caseStatus = require(`${process.cwd()}/db/models/doctor/caseStatus`);


const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);
const { getUserIdFromToken } = require(`${process.cwd()}/utils/token/getIdFromToken`);

const submitNewCase = catchAsync(async (req, res, next) => {

    const body = req.body;


    if (Object.keys(body).length === 0) {
        return next(new AppError('Request body is empty', 400));
    }


    const doctorId = getUserIdFromToken(req.headers.authorization.split(' ')[1]);

    if (doctorId) {

        const service = await services.findByPk(body.serviceId);

        if (!service) {
            return next(new AppError('Service dose not exists', 404));
        }

        if (service.isActive === false) {
            return next(new AppError('Service not active', 404));
        }


        const newCaseStatus = await cases.create({
            doctorId: doctorId,
            statusId: body.statusId,
            serviceId: body.serviceId,
            patientId: body.patientId,
            patientName: body.patientName,
            description: body.description,
            numberOfTooth: body.numberOfTooth,
            preferredCompletionDate: body.preferredCompletionDate,
            additionalNotes: body.additionalNotes,
            needMeeting: body.needMeeting,
        });

        const result = newCaseStatus.toJSON();
        return res.status(201).json({
            status: 'success',
            data: result,
        });
    } else {
        return next(new AppError('Doctor not found', 404));
    }
});

module.exports = submitNewCase;