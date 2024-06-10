
const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);
const caseStatus = require(`${process.cwd()}/db/models/doctor/caseStatus`);

const createCaseStatus = catchAsync(async (req, res, next) => {

    const body = req.body;


    if (Object.keys(body).length === 0) {
        return next(new AppError('Request body is empty', 400));
    }

    const isExists = await caseStatus.findOne({
        where: {
            status: body.status
        }
    })

    if (isExists) {
        return next(new AppError('Case status already exists', 400));
    }

    const newCaseStatus = await caseStatus.create({
        status: body.status
    });

    const result = newCaseStatus.toJSON();
    return res.status(201).json({
        status: 'success',
        data: result,
    });
});


module.exports = createCaseStatus;