
const sequelize = require(`${process.cwd()}/config/database`);

const cases = require(`${process.cwd()}/db/models/doctor/cases`);
const services = require(`${process.cwd()}/db/models/services/services`);
const caseStatus = require(`${process.cwd()}/db/models/doctor/caseStatus`);
const { doctor } = require(`${process.cwd()}/db/models/doctor/doctor`);
const { authUser } = require(`${process.cwd()}/db/models/auth/authUser`);
const { getUserIdFromToken } = require(`${process.cwd()}/utils/token/getIdFromToken`);

const casesTimeSheet = require(`${process.cwd()}/db/models/doctor/casesTimeSheet`);


const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const { CaseStatus } = require(`${process.cwd()}/utils/constants/enums`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);


const startWorkOnCase = catchAsync(async (req, res, next) => {
    const transaction = await sequelize.transaction();

    try {
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

        const userId = getUserIdFromToken(req.headers.authorization.split(' ')[1]);

        if (caseData.assigneeId !== userId) {
            return next(new AppError('This case is not assigned to you', 400));
        }

        if (caseData.status.status !== CaseStatus.NEWCASE && caseData.status.status !== CaseStatus.REQUESTCHANGES) {
            return next(new AppError('Can\'t start work on this case', 400));
        }

        const caseStatusDate = await caseStatus.findOne({
            where: {
                status: CaseStatus.INPROGRESS
            }
        });

        const casesTimeSheetData = await casesTimeSheet.findOne({
            where: {
                caseId: caseId,
                endDate: null,
            }
        });

        if (!casesTimeSheetData) {
            return next(new AppError('This case is not assigned to any user', 404));
        }

        if (!caseStatusDate) {
            return next(new AppError('Inprogress status not found', 404));
        }

        caseData.statusId = caseStatusDate.id;

        await caseData.save({ transaction });

        await casesTimeSheet.update(
            {
                endDate: new Date(),
            },
            {
                where:
                {
                    caseId: caseId,
                    endDate: null,
                }
            },
            { transaction }
        );

        await casesTimeSheet.create(
            {
                caseId: caseId,
                assigneeId: userId,
                caseStatus: caseStatusDate.id,
                startDate: new Date(),
            },
            { transaction }
        );


        await transaction.commit();

        res.status(200).json({
            status: 'success',
            message: 'Case started successfully',
        });


    } catch (error) {
        console.log(error);
        await transaction.rollback();
        return next(error);
    }
});

module.exports = startWorkOnCase;