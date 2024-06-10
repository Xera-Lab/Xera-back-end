
const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);
const caseStatus = require(`${process.cwd()}/db/models/doctor/caseStatus`);

const getAllCaseStatus = catchAsync(async (req, res, next) => {

    const caseStatusList = await caseStatus.findAll();

    if (!caseStatusList) {
        return next(new AppError('No case status found', 404));
    }

    return res.status(200).json({
        status: 'success',
        data: caseStatusList
    });
});


module.exports = getAllCaseStatus;