const jwt = require('jsonwebtoken');

const getDoctorIdFromToken = (token) => {
    const tokenDetail = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return tokenDetail.DoctorId;
}

const getAdminIdFromToken = (token) => {
    const tokenDetail = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return tokenDetail.AdminId;
}

module.exports = {
    getDoctorIdFromToken,
    getAdminIdFromToken
}
