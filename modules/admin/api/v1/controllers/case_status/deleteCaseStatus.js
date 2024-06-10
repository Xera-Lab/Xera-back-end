
const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);
const caseStatus = require(`${process.cwd()}/db/models/doctor/caseStatus`);


const deleteCaseStatus = catchAsync(async (req, res, next) => {

    const caseStatusId = req.params.id;

    if (!caseStatusId) {
        return next(new AppError('Case status id is required', 400));
    }

    const deletedCaseStatus = await caseStatus.findByPk(caseStatusId);

    if (!deletedCaseStatus) {
        return next(new AppError('Case status dose not exists', 404));
    }

    await deletedCaseStatus.destroy();

    return res.status(200).json({
        status: 'success',
        message: 'Case status deleted successfully'
    });
});


module.exports = deleteCaseStatus;