const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const push = user => usersRepo.push(user);

const getUser = async id => {
  return await usersRepo.getAll().then(users => {
    return users.find(user => user.id === id);
  });
};

const updateUser = async (userId, newUser) =>
  await usersRepo.update(userId, newUser);

const deleteUser = async userId => {
  await tasksService.unassignTasks(userId);
  await usersRepo.deleteUser(userId);
};

module.exports = { getAll, push, getUser, updateUser, deleteUser };
