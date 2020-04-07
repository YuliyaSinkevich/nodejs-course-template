const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();

const push = (task) => tasksRepo.push(task);

const getTask = async (id) => {
  return await tasksRepo.getAll().then(tasks => {
    return tasks.find((task) => task.id === id);
  });
};

const updateTask = async (id, req) => {
  getTask(id)
    .then(task => task.title = req.title);
};

const deleteTask = async (taskId, boardId) => tasksRepo.deleteTask(taskId, boardId);

module.exports = { getAll, push, getTask, updateTask, deleteTask };
