const router = require('express').Router();
const { Task } = require('./task.model');
const tasksService = require('./task.service');
const { validateId, ErrorHandler, handleErrors } = require('../logging');
const { NOT_FOUND } = require('../logging/constants');

router
  .route('/:boardId/tasks/')
  .get(async (req, res) => {
    const tasks = await tasksService.getAll();
    res.json(tasks);
  })
  .post(async (req, res) => {
    const task = await new Task({
      boardId: req.params.boardId,
      task: req.body
    });
    await tasksService.push(task);
    res.json(task);
  });

router
  .route('/:boardId/tasks/:taskId')
  .get(
    handleErrors(async (req, res) => {
      await validateId(req.params.taskId);

      const task = await tasksService.getTask(req.params.taskId);
      if (!task) throw new ErrorHandler(NOT_FOUND.code, NOT_FOUND.message);

      res.json(task);
    })
  )
  .put(
    handleErrors(async (req, res) => {
      await validateId(req.params.taskId);

      const task = await tasksService.getTask(req.params.taskId);
      if (!task) throw new ErrorHandler(NOT_FOUND.code, NOT_FOUND.message);

      await tasksService.updateTask(req.params.taskId, req.body);
      res.json(task);
    })
  )
  .delete(
    handleErrors(async (req, res) => {
      await validateId(req.params.taskId);

      await tasksService.deleteTask(req.params.boardId, req.params.taskId);
      res.status(204).send('Del');
    })
  );

module.exports = router;
