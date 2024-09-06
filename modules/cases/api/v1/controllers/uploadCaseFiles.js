
const cases = require(`${process.cwd()}/db/models/doctor/cases`);

const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);
const AwsConfig = require(`${process.cwd()}/utils/aws/awsConfig`);


const uploadCaseFiles = catchAsync(async (req, res, next) => {
    try {
        const caseId = req.params.caseId;

        const caseData = await cases.findByPk(caseId);

        if (!caseData) {
            return next(new AppError('Case not found', 404));
        }

        const file = req.file;

        if (!file || file.length === 0) {
            return next(new AppError('No files uploaded', 400));
        }

        if (file.originalname.split('.').pop() !== 'zip') {
            return next(new AppError('Only zip files are allowed', 400));
        }

        const fileName = `Cases-${process.env.NODE_ENV}/${caseId}/Original.${file.originalname.split('.').pop()}`;

        const fileUrl = await AwsConfig.uploadFileToS3(
            fileName,
            file
        );

        caseData.caseUrl = fileUrl;

        await caseData.save();

        res.status(200).json(
            {
                status: 'success',
                message: 'File uploaded successfully',
                data: {
                    fileUrl
                }
            }
        );
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
});

module.exports = uploadCaseFiles;