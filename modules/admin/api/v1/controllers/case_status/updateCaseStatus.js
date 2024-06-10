
const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);
const caseStatus = require(`${process.cwd()}/db/models/doctor/caseStatus`);

const updateCaseStatus = catchAsync(async (req, res, next) => {

    const caseStatusId = req.params.id;;

    const body = req.body;

    if (!caseStatusId) {
        return next(new AppError('Case status id is required', 400));
    }

    const updatedCaseStatus = await caseStatus.findByPk(caseStatusId);

    if (!updatedCaseStatus) {
        return next(new AppError('Case status dose not exists', 404));
    }

    if (body.status) {
        updatedCaseStatus.status = body.status;
    }

    await updatedCaseStatus.save();

    return res.status(200).json({
        status: 'success',
        message: 'Case status updated successfully'
    });
});


module.exports = updateCaseStatus;