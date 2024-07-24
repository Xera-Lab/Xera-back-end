const { Sequelize, Op } = require('sequelize');
const cases = require(`${process.cwd()}/db/models/doctor/cases`);
const caseStatus = require(`${process.cwd()}/db/models/doctor/caseStatus`);

const { getUserIdFromToken } = require(`${process.cwd()}/utils/token/getIdFromToken`);

const catchAsync = require(`${process.cwd()}/utils/errors/catchAsync`);
const { CaseStatus } = require(`${process.cwd()}/utils/constants/enums`);
const AppError = require(`${process.cwd()}/utils/errors/appError`);

const getCasesCountByStatus = catchAsync(async (req, res, next) => {

    const userId = getUserIdFromToken(req.headers.authorization.split(' ')[1]);

    if (userId === null) {
        return next(new AppError('Invalid token', 401));
    }

    console.log(" ====>>>> ");

    try {
        const results = await cases.findAll({
            attributes: [
                [Sequelize.fn('COUNT', Sequelize.col('cases.id')), 'count'],
                [Sequelize.col('status.status'), 'status']
            ],
            where: {
                assigneeId: userId,
            },
            include: [
                {
                    model: caseStatus,
                    as: 'status',
                    attributes: []
                }
            ],
            group: ['status.status'],
            raw: true
        });

        const data = results.map(result => ({
            status: result.status,
            count: result.count
        }));

        res.status(200).json({
            status: 'success',
            data: data,
        });

    } catch (error) {
        console.log(error);
        return next(error);
    }

});


module.exports = getCasesCountByStatus;
