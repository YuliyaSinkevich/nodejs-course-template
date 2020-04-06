const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();

const push = (task) => tasksRepo.push(task);

const getTask = async (id) => {
  return await tasksRepo.getAll().then(tasks => {
    return tasks.find((task) => task.id === id);
  });
};

module.exports = { getAll, push, getTask };
