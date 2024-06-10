
const cases = require(`${process.cwd()}/db/models/doctor/cases`);

const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);


const deleteCase = catchAsync(async (req, res, next) => {

    const caseId = req.params.caseId;

    if (!caseId) {
        return next(new AppError('Case id is required', 400));
    }

    const caseData = await cases.findByPk(caseId);

    if (!caseData) {
        return next(new AppError('Cases not found', 404));
    }
    await caseData.destroy();



    res.status(200).json({
        status: 'success',
        data: 'Case deleted successfully',
    });
});

module.exports = deleteCase;