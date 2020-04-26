const {
  logRequests,
  validateId,
  handleErrors,
  createError,
  ErrorHandler,
  log,
  sendResponse
} = require('./loggerMiddleware');
const loggerWinston = require('./loggerWinston');

module.exports = {
  logRequests,
  validateId,
  ErrorHandler,
  handleErrors,
  createError,
  log,
  loggerWinston,
  sendResponse
};
