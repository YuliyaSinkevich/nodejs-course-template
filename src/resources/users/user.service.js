const usersRepo = require('./user.db.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const getUser = async userId => usersRepo.getById(userId);

const add = user => usersRepo.add(user);

const updateUser = async (userId, newUser) =>
  await usersRepo.update(userId, newUser);

const deleteUser = async userId => {
  await tasksService.unassignTasks(userId);
  await usersRepo.deleteUser(userId);
};

module.exports = { getAll, add, getUser, updateUser, deleteUser };
