const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const push = user => usersRepo.push(user);

const getUser = async id => {
  return await usersRepo.getAll().then(users => {
    return users.find(user => user.id === id);
  });
};

const updateUser = async (userId, newUser) =>
  await usersRepo.update(userId, newUser);

const deleteUser = async id => usersRepo.deleteUser(id);

module.exports = { getAll, push, getUser, updateUser, deleteUser };
