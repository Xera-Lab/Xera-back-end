const jwt = require('jsonwebtoken');

const getDoctorIdFromToken = (token) => {
    const tokenDetail = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return tokenDetail.userId;
}

const getAdminIdFromToken = (token) => {
    const tokenDetail = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return tokenDetail.userId;
}

module.exports = {
    getDoctorIdFromToken,
    getAdminIdFromToken
}
