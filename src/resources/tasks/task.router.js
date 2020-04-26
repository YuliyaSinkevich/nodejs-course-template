const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');
const { validateId, ErrorHandler, handleErrors } = require('../logging');
const { NOT_FOUND, BAD_REQUEST } = require('../logging/constants');

router
  .route('/')
  .get(async (req, res) => {
    const tasks = await tasksService.getAll();
    res.status(200).json(tasks.map(Task.toResponse));
  })
  .post(async (req, res) => {
    const task = await new Task({ ...req.body, boardId: req.params.boardId });
    await tasksService.push(task);
    res.status(200).json(Task.toResponse(task));
  });

router
  .route('/:taskId')
  .get(
    handleErrors(async (req, res) => {
      if (!req.params.boardId || !req.params.taskId) {
        throw new ErrorHandler(BAD_REQUEST.code, BAD_REQUEST.message);
      }

      const task = await tasksService.getTask(req.params.taskId);
      if (!task) throw new ErrorHandler(NOT_FOUND.code, NOT_FOUND.message);

      res.status(200).json(Task.toResponse(task));
    })
  )
  .put(
    handleErrors(async (req, res) => {
      if (!req.params.boardId || !req.params.taskId) {
        throw new ErrorHandler(BAD_REQUEST.code, BAD_REQUEST.message);
      }

      const task = await tasksService.getTask(req.params.taskId);
      if (!task) throw new ErrorHandler(NOT_FOUND.code, NOT_FOUND.message);

      await tasksService.updateTask(req.params.taskId, req.body);
      res.status(200).json(Task.toResponse(task));
    })
  )
  .delete(
    handleErrors(async (req, res) => {
      if (!req.params.boardId || !req.params.taskId) {
        throw new ErrorHandler(BAD_REQUEST.code, BAD_REQUEST.message);
      }

      await tasksService.deleteTask(req.params.boardId, req.params.taskId);
      res.status(204).send('Del');
    })
  );

module.exports = router;
