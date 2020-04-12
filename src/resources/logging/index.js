const { logRequests, handleErrors, createError, ErrorHandler,
  handleError } = require('./loggerMiddleware');
const loggerWinston = require('./loggerWinston');

module.exports = { logRequests, ErrorHandler,
  handleError, handleErrors, createError, loggerWinston };
