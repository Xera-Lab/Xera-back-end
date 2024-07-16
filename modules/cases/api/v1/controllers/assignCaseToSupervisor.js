
const sequelize = require(`${process.cwd()}/config/database`);
const cases = require(`${process.cwd()}/db/models/doctor/cases`);
const casesTimeSheet = require(`${process.cwd()}/db/models/doctor/casesTimeSheet`);
const caseStatus = require(`${process.cwd()}/db/models/doctor/caseStatus`);
const { CaseStatus } = require(`${process.cwd()}/utils/constants/enums`);
const { getUserIdFromToken } = require(`${process.cwd()}/utils/token/getIdFromToken`);


const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);



const assignCaseToSupervisor = catchAsync(async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {


        const caseId = req.params.caseId;

        const userId = getUserIdFromToken(req.headers.authorization.split(' ')[1]);

        if (userId.split('_')[0] !== 'ADMIN') {
            return next(new AppError('You are not authorized', 400));
        }

        if (!caseId) {
            return next(new AppError('Case id is required', 400));
        }

        const caseData = await cases.findByPk(caseId);

        if (!caseData) {
            return next(new AppError('Cases not found', 404));
        }

        if (!req.body.supervisorId) {
            return next(new AppError('Supervisor id id is required', 400));
        }


        if (req.body.supervisorId.toString().split('_')[0] !== 'SUPERVISOR') {
            return next(new AppError('Supervisor id is invalid', 400));
        }





        caseData.supervisorId = req.body.supervisorId;
        caseData.adminId = userId;

        await caseData.save({ transaction });

        const casesTimeSheetData = await casesTimeSheet.findOne({
            where: {
                caseId: caseId,
                endDate: null,
            }
        });

        const caseStatusDate = await caseStatus.findOne({
            where: {
                status: CaseStatus.NEWCASE
            }
        });

        if (!casesTimeSheetData) {

            await casesTimeSheet.create({
                caseId: caseId,
                assigneeId: req.body.supervisorId,
                caseStatus: caseStatusDate.id,
                startDate: new Date(),
            }, { transaction });

        } else if (casesTimeSheetData.assigneeId !== req.body.supervisorId) {

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

            await casesTimeSheet.create({
                caseId: caseId,
                assigneeId: req.body.supervisorId,
                caseStatus: caseStatusDate.id,
                startDate: new Date(),
            }, { transaction });

        } else {
            await transaction.rollback();
            return next(new AppError('Case already assigned to this user', 400));
        }


        await transaction.commit();

        res.status(200).json({
            status: 'success',
            data: 'Case assigned successfully to ' + req.body.supervisorId,
        });

    } catch (error) {
        await transaction.rollback();
        return next(error);
    }

});

module.exports = assignCaseToSupervisor;