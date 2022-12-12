const ApiError = require('./ApiError.js');
const httpStatus = require('http-status');

const hasAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization.includes("Bearer")) {
        throw new ApiError(httpStatus.FORBIDDEN, 'FORBIDDEN');
    }
    const code = authorization.split(' ')[1];
    if (code !== 'Based on our custom tokensize') {
        throw new ApiError(httpStatus.FORBIDDEN, 'FORBIDDEN');
    }
    next();
}

module.exports = hasAuth;