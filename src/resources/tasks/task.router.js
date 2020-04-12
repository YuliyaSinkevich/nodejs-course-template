const router = require('express').Router();
const { Task } = require('./task.model');
const tasksService = require('./task.service');

router.route('/:boardId/tasks/').get(async (req, res) => {
  const tasks = await tasksService.getAll();
  res.json(tasks);
})
  .post(async (req, res) => {
    const task = await new Task({ boardId: req.params.boardId, task: req.body });
    await tasksService.push(task);
    res.json(task);
  });

router.route('/:boardId/tasks/:taskId')
  .get(async (req, res) => {
    const task = await tasksService.getTask(req.params.taskId);
    res.json(task);
  })
  .put(async (req, res) => {
    const task = await tasksService.getTask(req.params.taskId);
    await tasksService.updateTask(req.params.taskId, req.body);
    res.json(task);
  })
  .delete(async (req, res) => {
    //TODO
    await tasksService.deleteTask(req.params.taskId, req.params.boardId);
    res.status(204).send('Del');
  });

// TODO: put, delete

module.exports = router;
