
const cases = require(`${process.cwd()}/db/models/doctor/cases`);

const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);

const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');


const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const caseDownloadUrl = catchAsync(async (req, res, next) => {

    const url = req.body.url;


    if (!url) {
        return next(new AppError('Url is required', 400));
    }

    const key = url.split('amazonaws.com/').pop();

    if (!key) {
        return next(new AppError('Key is required', 400));
    }
    console.log(key)
    try {
        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: key
        };

        // Generate a presigned URL for the object
        const command = new GetObjectCommand(params);
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // URL valid for 1 hour

        res.status(200).json({ url });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
});

module.exports = caseDownloadUrl;