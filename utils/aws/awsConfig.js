const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const uploadFileToS3 = async (key, file) => {
    const params = {
        Bucket: process.env.AWS_S3_CASES_BUCKET_NAME,
        Key: key, // File name you want to save as in S3
        Body: file.buffer,
    };

    try {
        const command = new PutObjectCommand(params);
        await s3Client.send(command);
        const fileUrl = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
        return fileUrl;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw new Error('Error uploading file');
    }
};

const uploadFileToPublicS3 = async (key, file) => {
    const params = {
        Bucket: process.env.AWS_S3_SERVICES_BUCKET_NAME,
        Key: key, // File name you want to save as in S3
        Body: file.buffer,
        ACL: 'public-read' // Set the file to be publicly readable
    };

    try {
        const command = new PutObjectCommand(params);
        await s3Client.send(command);
        const fileUrl = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
        return fileUrl;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw new Error('Error uploading file');
    }
};


module.exports = {
    s3Client,
    uploadFileToS3,
    uploadFileToPublicS3
}