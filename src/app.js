const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const {
  logRequests,
  handleErrors,
  ErrorHandler,
  createError,
  log
} = require('./resources/logging');
const { NOT_FOUND, UNKNOWN_ERROR } = require('./resources/logging/constants');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const userRouter = require('./resources/users/user.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(logRequests);

app.use('/users', userRouter);

app.use('/boards', boardRouter);

app.use('/boards/:id/tasks', taskRouter);

app.use(
  '*',
  handleErrors(async (req, res) => {
    throw new ErrorHandler(NOT_FOUND.code, NOT_FOUND.message);
  })
);

// Промежуточный обработчик для обработки ошибок должен быть определен последним, после указания всех app.use()
app.use(createError);

process
  .on('unhandledRejection', (reason, promise) => {
    log(new ErrorHandler(UNKNOWN_ERROR.code, UNKNOWN_ERROR.message));
  })
  .on('uncaughtException', (error, origin) => {
    log(new ErrorHandler(UNKNOWN_ERROR.code, UNKNOWN_ERROR.message));
    process.exit(1);
  });

// check unhandledRejection and uncaughtException
// Promise.reject(Error('Oops!'));
// throw Error('Oops!');

module.exports = app;
