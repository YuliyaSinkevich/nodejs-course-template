const { logRequests, validateId, handleErrors, createError, ErrorHandler } = require('./loggerMiddleware');
const loggerWinston = require('./loggerWinston');

module.exports = { logRequests, validateId, ErrorHandler, handleErrors, createError, loggerWinston };
