const jwt = require('jsonwebtoken');

const getUserIdFromToken = (token) => {
    const tokenDetail = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return tokenDetail.userId;
}


module.exports = {
    getUserIdFromToken,
}
