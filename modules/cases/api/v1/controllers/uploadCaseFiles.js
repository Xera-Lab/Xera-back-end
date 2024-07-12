
const cases = require(`${process.cwd()}/db/models/doctor/cases`);

const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
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
        Key: `Cases/${caseId}/Original.${file.originalname.split('.').pop()}`, // File name you want to save as in S3
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

const uploadCaseFiles = catchAsync(async (req, res, next) => {

    const caseId = req.params.caseId;

    const caseRecord = await cases.findByPk(caseId);
    if (!caseRecord) {
        return next(new AppError('Case not found', 404));
    }

    const file = req.file;

    if (!file || file.length === 0) {
        return next(new AppError('No files uploaded', 400));
    }

    try {


        const fileUrl = await uploadFileToS3(caseId, file);

        caseRecord.caseUrl = fileUrl;
        await caseRecord.save();

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