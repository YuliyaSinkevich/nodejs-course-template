class ErrorHandler extends Error {
  constructor (status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}

const handleError = (err, res) => {
  const { status, message } = err;
  console.log('status');
  res.status(status).json({
    status,
    message,
  });
};

const logRequests = (req, res, next) => {
  const { url, params, body } = req;
  console.log('////////////////// LOGGING REQUEST //////////////////')
  console.log('\nURL -->', url, '\nPARAMS -->', params, '\nBODY -->', body);
  next();
};

const log = (error) => {
  console.log('////////////////// LOGGING ERROR //////////////////', error.status, error.message);
};

const handleErrors = func => async (req, res, next) => {
  try {
    return await func(req, res, next);
  } catch (error) {
    next(error);
  }
};

const createError = (error, req, res, next) => {
  res.status(error.status).json({
    status: 'error',
    statusCode: error.status,
    message: error.message,
  });
  // Logging error
  log(error);
};

module.exports = {
  logRequests, ErrorHandler,
  handleError, handleErrors, createError
};

// При передаче какого-либо объекта в функцию next() (кроме строки 'route'),
// Express интерпретирует текущий запрос как ошибку и пропустит все остальные функции маршрутизации и промежуточной обработки,
// не являющиеся функциями обработки ошибок.

//Функции промежуточного обработчика для обработки ошибок определяются так же, как и другие функции промежуточной обработки,
// но с указанием для функции обработки ошибок не трех, а четырех аргументов: (err, req, res, next).