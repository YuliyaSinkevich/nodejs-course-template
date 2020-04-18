const tasksRepo = require('./task.memory.repository');
const { ErrorHandler } = require('../logging');
const { NOT_FOUND } = require('../logging/constants');

const getAll = () => tasksRepo.getAll();

const push = task => tasksRepo.push(task);

const getTask = taskId => tasksRepo.getTask(taskId);

const updateTask = (taskId, newTask) => tasksRepo.update(taskId, newTask);

const unassignTasks = userId => tasksRepo.unassignTasks(userId);

const deleteTask = (boardId, taskId) => {
  const task = tasksRepo.getTask(taskId);
  if (!task) throw new ErrorHandler(NOT_FOUND.code, NOT_FOUND.message);

  return tasksRepo.deleteTask(taskId);
};

const deleteTasksByBoardId = async boardId => {
  const tasks = await tasksRepo.getAll();
  if (!tasks) throw new ErrorHandler(NOT_FOUND.code, NOT_FOUND.message);

  tasks.map((task, i) => {
    if (tasks[i].boardId === boardId) {
      tasksRepo.deleteTask(tasks[i].id);
    }
  });
};

module.exports = {
  getAll,
  push,
  getTask,
  updateTask,
  deleteTask,
  unassignTasks,
  deleteTasksByBoardId
};
