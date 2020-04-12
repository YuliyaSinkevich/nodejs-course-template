const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const { logRequests, handleErrors, ErrorHandler, createError } = require('./resources/logging');
const { NOT_FOUND } = require('./resources/logging/constants');
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

app.use('*', handleErrors(async (req, res) => {
  throw new ErrorHandler(NOT_FOUND.code, NOT_FOUND.message);
}));

//Промежуточный обработчик для обработки ошибок должен быть определен последним, после указания всех app.use()
app.use(createError);

//TODO add *
module.exports = app;
