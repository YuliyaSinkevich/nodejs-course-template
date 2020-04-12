const validator = require('validator');
const { BAD_REQUEST } = require('../logging/constants');

const logRequests = async (req, res, next) => {
  const { method, url, params, body } = req;
  console.log('////////////////// LOGGING REQUEST //////////////////');
  console.log(
    'METHOD -->',
    method,
    '\nURL -->',
    url,
    '\nPARAMS -->',
    params,
    '\nBODY -->',
    body
  );
  next();
};

class ErrorHandler extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}

const sendResponse = (error, res) => {
  const { status, message } = error;
  res.status(status).json({
    status: 'error',
    statusCode: status,
    message
  });
};

const log = error => {
  console.log(
    '////////////////// LOGGING ERROR //////////////////',
    error.status,
    error.message
  );
};

const validateId = async id => {
  if (!validator.isUUID(id)) {
    throw new ErrorHandler(BAD_REQUEST.code, BAD_REQUEST.message);
  }
};

const handleErrors = func => async (req, res, next) => {
  try {
    return await func(req, res, next);
  } catch (error) {
    next(error);
  }
};

const createError = (error, req, res, next) => {
  sendResponse(error, res);
  // Logging error
  log(error);
};

module.exports = {
  logRequests,
  validateId,
  ErrorHandler,
  handleErrors,
  createError,
  log
};

// При передаче какого-либо объекта в функцию next() (кроме строки 'route'),
// Express интерпретирует текущий запрос как ошибку и пропустит все остальные функции маршрутизации и промежуточной обработки,
// не являющиеся функциями обработки ошибок.

// Функции промежуточного обработчика для обработки ошибок определяются так же, как и другие функции промежуточной обработки,
// но с указанием для функции обработки ошибок не трех, а четырех аргументов: (err, req, res, next).
