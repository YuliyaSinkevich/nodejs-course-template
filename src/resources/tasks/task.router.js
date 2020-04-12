const router = require('express').Router({ mergeParams: true });
const { Task } = require('./task.model');
const tasksService = require('./task.service');
const { validateId, ErrorHandler, handleErrors } = require('../logging');
const { NOT_FOUND } = require('../logging/constants');

router
  .route('/')
  .get(async (req, res) => {
    const tasks = await tasksService.getAll();
    res.json(tasks);
  })
  .post(async (req, res) => {
    const task = await new Task({ boardId: req.params.id, task: req.body });
    await tasksService.push(task);
    res.json(task);
  });

router
  .route('/:id')
  .get(
    handleErrors(async (req, res) => {
      await validateId(req.params.id);

      const task = await tasksService.getTask(req.params.id);
      if (!task) throw new ErrorHandler(NOT_FOUND.code, NOT_FOUND.message);

      res.json(task);
    })
  )
  .put(
    handleErrors(async (req, res) => {
      await validateId(req.params.id);

      const task = await tasksService.getTask(req.params.id);
      if (!task) throw new ErrorHandler(NOT_FOUND.code, NOT_FOUND.message);

      await tasksService.updateTask(req.params.id, req.body);
      res.json(req.body);
    })
  )
  .delete(
    handleErrors(async (req, res) => {
      await validateId(req.params.id);

      const task = await tasksService.getTask(req.params.id);
      if (!task) throw new ErrorHandler(NOT_FOUND.code, NOT_FOUND.message);

      await tasksService.deleteTask(req.params.id, req.params.boardId);
      res.status(204).send('Del');
    })
  );

// TODO: put, delete

module.exports = router;
