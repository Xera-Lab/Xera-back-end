
const sequelize = require(`${process.cwd()}/config/database`);
const cases = require(`${process.cwd()}/db/models/doctor/cases`);
const casesTimeSheet = require(`${process.cwd()}/db/models/doctor/casesTimeSheet`);

const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);



const assignCase = catchAsync(async (req, res, next) => {

    const caseId = req.params.caseId;

    if (!caseId) {
        return next(new AppError('Case id is required', 400));
    }

    const caseData = await cases.findByPk(caseId);

    if (!caseData) {
        return next(new AppError('Cases not found', 404));
    }

    if (!caseData.assigneeId) {
        return next(new AppError('Assignee id is required', 400));
    }

    const transaction = await sequelize.transaction();

    caseData.assigneeId = req.body.assigneeId;

    await caseData.save({ transaction });

    const casesTimeSheetData = await casesTimeSheet.findOne({
        where: {
            caseId: caseId,
            endDate: null,
        }
    });



    console.log(casesTimeSheetData);
    console.log(req.body.assigneeId);
    if (!casesTimeSheetData) {
        await casesTimeSheet.create({
            caseId: caseId,
            assigneeId: req.body.assigneeId,
            startDate: new Date(),
        }, { transaction });
    } else if (casesTimeSheetData.assigneeId !== req.body.assigneeId) {
        await casesTimeSheet.update({
            endDate: new Date(),
        },
            {
                where:
                {
                    caseId: caseId
                }
            },
            { transaction });
        await casesTimeSheet.create({
            caseId: caseId,
            assigneeId: req.body.assigneeId,
            startDate: new Date(),
        }, { transaction });
    } else {
        return next(new AppError('Case already assigned to this user', 400));
    }




    await transaction.commit();

    res.status(200).json({
        status: 'success',
        data: 'Case assigned successfully to' + req.body.assigneeId,
    });
});

module.exports = assignCase;