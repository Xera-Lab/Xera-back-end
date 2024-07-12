
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

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const uploadFileToS3 = async (caseId, file) => {
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `Cases/${caseId}/Submited.${file.originalname.split('.').pop()}`, // File name you want to save as in S3
        Body: file.buffer,
        // ACL: 'public-read' // Access control for the file
    };

    try {
        const command = new PutObjectCommand(params);
        const data = await s3Client.send(command);
        const fileUrl = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
        return fileUrl;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw new Error('Error uploading file');
    }
};


const sendCaseToReview = catchAsync(async (req, res, next) => {
    const transaction = await sequelize.transaction();
    // const file = req.file;

    // if (!file || file.length === 0) {
    //     return next(new AppError('No files uploaded', 400));
    // }

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

        if (caseData.status.status !== CaseStatus.INPROGRESS) {
            return next(new AppError('Can\'t send case to review', 400));
        }

        const caseStatusDate = await caseStatus.findOne({
            where: {
                status: CaseStatus.SENTTOREVIEW,
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
            return next(new AppError('Send to review status not found', 404));
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
                assigneeId: casesTimeSheetData.assigneeId,
                caseStatus: caseStatusDate.id,
                startDate: new Date(),
            },
            { transaction }
        );

        // await uploadFileToS3(caseId, file);

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