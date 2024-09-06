
const services = require(`${process.cwd()}/db/models/services/services`);

const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);
const AwsConfig = require(`${process.cwd()}/utils/aws/awsConfig`);


const uploadServiceImage = catchAsync(async (req, res, next) => {
    try {
        const serviceId = req.params.serviceId;

        const serviceData = await services.findByPk(serviceId);

        if (!serviceData) {
            return next(new AppError('Case not found', 404));
        }

        const image = req.file;

        if (!image || image.length === 0) {
            return next(new AppError('No image uploaded', 400));
        }

        if (image.originalname.split('.').pop() !== 'svg' && image.originalname.split('.').pop() !== 'png') {
            return next(new AppError('Only svg and png files are allowed', 400));
        }

        const fileName = `Services-${process.env.NODE_ENV}/${serviceId}/${serviceData.searchName}.${image.originalname.split('.').pop()}`;

        const fileUrl = await AwsConfig.uploadFileToPublicS3(
            fileName,
            image
        );

        serviceData.imageUrl = fileUrl;

        await serviceData.save();

        res.status(200).json(
            {
                status: 'success',
                message: 'Image uploaded successfully',
                data: {
                    fileUrl
                }
            }
        );
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
});

module.exports = uploadServiceImage;