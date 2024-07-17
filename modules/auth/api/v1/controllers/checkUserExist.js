
const authUser = require(`${process.cwd()}/db/models/auth/authUser`);
const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);




const checkUserExist = catchAsync(async (req, res, next) => {


    if (Object.keys(req.body).length === 0) {
        return next(new AppError('Request body is empty', 400));
    }

    const { email } = req.body;

    if (!email) {
        return next(new AppError('Email is required', 400));
    }

    const authUserData = await authUser.findOne({
        where: {
            email
        },
    });

    var isExist = false;

    if (authUserData) {
        isExist = true;
    } else {
        isExist = false;
    }

    return res.status(200).json({
        status: 'success',
        data: {
            isExist: isExist,
        }
    });
});

module.exports = checkUserExist;