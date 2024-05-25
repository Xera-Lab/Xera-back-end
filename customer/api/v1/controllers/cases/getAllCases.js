
const cases = require(`${process.cwd()}/db/models/cases`);
const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);

const getAllCases = catchAsync(async (req, res, next) => {

    const casesData = await cases.findAll();

    if (!casesData) {
        return next(new AppError('Cases not found', 404));
    }


    res.status(200).json({
        status: 'success',
        data: casesData
    });
});

module.exports = getAllCases;