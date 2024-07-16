
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
const AwsConfig = require(`${process.cwd()}/utils/aws/awsConfig`);



const sendCaseToReview = catchAsync(async (req, res, next) => {
    const transaction = await sequelize.transaction();

    try {

        const file = req.file;

        if (!file || file.length === 0) {
            return next(new AppError('No files uploaded', 400));
        }

        if (file.originalname.split('.').pop() !== 'zip') {
            return next(new AppError('Only zip files are allowed', 400));
        }

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

        if (caseData.status.status !== CaseStatus.INPROGRESS) {
            return next(new AppError('Can\'t send case to review', 400));
        }

        const caseStatusDate = await caseStatus.findOne({
            where: {
                status: CaseStatus.SENTTOREVIEW,
            }
        });

        if (!caseStatusDate) {
            return next(new AppError('Send to review status not found', 404));
        }

        const casesTimeSheetData = await casesTimeSheet.findOne({
            where: {
                caseId: caseId,
                endDate: null,
            }
        });

        if (!casesTimeSheetData) {
            return next(new AppError('This case is not assigned to any user', 404));
        }


        if (casesTimeSheetData.assigneeId !== userId) {
            return next(new AppError('This case is not assigned to you', 400));
        }



        await casesTimeSheet.update(
            {
                endDate: new Date(),
            },
            {
                where:
                {
                    caseId: caseId,
                    endDate: null,
                },
                transaction
            },
        );

        await casesTimeSheet.create(
            {
                caseId: caseId,
                assigneeId: caseData.supervisorId,
                caseStatus: caseStatusDate.id,
                startDate: new Date(),
            },
            { transaction }
        );

        const fileName = `Cases/${caseId}/Submited.${file.originalname.split('.').pop()}`;
        const fileUrl = await AwsConfig.uploadFileToS3(fileName, file);

        caseData.statusId = caseStatusDate.id;
        caseData.techCaseUrl = fileUrl;

        await caseData.save({ transaction });

        await transaction.commit();

        res.status(200).json({
            status: 'success',
            message: 'Case sent to review successfully',
        });
    } catch (error) {
        console.log(error);
        await transaction.rollback();
        return next(error);
    }
});

module.exports = sendCaseToReview;