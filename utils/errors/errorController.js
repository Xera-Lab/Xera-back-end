const AppError = require('./appError');
const printBoxedMessage = (message) => {
    // Split the message into lines
    const lines = message.split('\n');

    // Determine the maximum width of the message lines
    const maxLength = lines.reduce((max, line) => Math.max(max, line.length), 0);

    // Create the top and bottom borders
    const horizontalBorder = '+' + '-'.repeat(maxLength + 2) + '+';

    console.log(horizontalBorder);

    // Print each line within vertical borders
    lines.forEach(line => {
        const padding = maxLength - line.length;
        const paddedLine = line + ' '.repeat(padding);
        console.log('| ' + paddedLine + ' |');
    });

    console.log(horizontalBorder);
}
const logError = (error) => {
    const boundary = '=======================================================================';
    console.log("\x1b[31m", boundary, "\x1b[0m");
    console.log("\x1b[31m", "🔴 Error occurred:", "\x1b[0m");
    console.log("\x1b[34m", "📝 Message:", "\x1b[0m", error.message);
    if (error.stack) {
        console.log("\x1b[33m", "🔍 Stack Trace:",);
        printBoxedMessage(error.stack);
        console.error("\x1b[0m");
    }
    console.log("\x1b[31m", boundary, "\x1b[0m");
}

const sendErrorProd = (error, res) => {
    const statusCode = error.statusCode || 500;
    const status = error.status || 'error';
    const message = error.message;
    const stack = error.stack;

    logError(error);
    if (error.isOperational) {
        return res.status(statusCode).json({
            status,
            message,
        });
    }

    return res.status(500).json({
        status: 'error',
        message: 'Something went very wrong',
    });
};

const globalErrorHandler = (err, req, res, next) => {
    if (err.name === 'JsonWebTokenError') {
        err = new AppError('Invalid token', 401);
    }
    if (err.name === 'SequelizeValidationError') {
        err = new AppError(err.errors[0].message, 400);
    }
    if (err.name === 'SequelizeUniqueConstraintError') {
        err = new AppError(err.errors[0].message, 400);
    }

    sendErrorProd(err, res);
};

module.exports = globalErrorHandler;