const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const push = (user) => usersRepo.push(user);

const getUser = async (id) => {
  const user = await usersRepo.getAll().then(users => {
    return users.find((user) => user.id === id);
  });

  // !user && res.status(404).send('User not found');

  return user;
};

const updateUser = async (id, req) => {
  getUser(id)
    .then(user => user.name = req.name);
};

const deleteUser = async (id) => usersRepo.deleteUser(id);

module.exports = { getAll, push, getUser, updateUser, deleteUser };
