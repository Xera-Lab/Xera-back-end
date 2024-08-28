const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);

const authUser = require(`${process.cwd()}/db/models/auth/authUser`);

const { getUserIdFromToken } = require(`${process.cwd()}/utils/token/getIdFromToken`);
const { doctor } = require(`${process.cwd()}/db/models/doctor/doctor`);



const editProfile = catchAsync(async (req, res, next) => {

    try {

        const body = req.body;

        const userId = getUserIdFromToken(req.headers.authorization.split(' ')[1]);
        if (Object.keys(body).length === 0) {
            return next(new AppError('Request body is empty', 400));
        }

        if (userId.split('_')[0] !== 'DOCTOR') {
            return next(new AppError('Invalid token', 401));
        }


        const authUserData = await authUser.findByPk(userId.split('_')[1]);
        if (body.firstName !== undefined) {
            authUserData.firstName = body.firstName;
        }
        if (body.lastName !== undefined) {
            authUserData.lastName = body.lastName;
        }


        const doctorData = await doctor.findOne({
            where: {
                doctorId: userId,
            }
        });


        if (body.phoneNumber !== undefined) {
            doctorData.phoneNumber = body.phoneNumber;
        }

        if (body.dentalPracticeName !== undefined) {
            doctorData.dentalPracticeName = body.dentalPracticeName;
        }

        if (body.practiceAddress !== undefined) {
            doctorData.practiceAddress = body.practiceAddress;
        }

        if (body.specialty !== undefined) {
            doctorData.specialty = body.specialty;
        }


        authUserData.save();
        doctorData.save();


        res.status(200).json({
            status: 'success',
            message: 'Profile updated successfully',
        });

    } catch (error) {
        console.log(error);
        await transaction.rollback();
        return next(new AppError(error, 500));
    }

});

module.exports = editProfile;