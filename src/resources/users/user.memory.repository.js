// instead of .json file
let users = [];

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return users;
};

const push = async user => {
  users.push(user);
};

const update = async (userId, newUser) => {
  const index = await users.findIndex(item => item.id === userId);
  users[index] = newUser;
};

const deleteUser = async id => {
  users = users.filter(user => user.id !== id);
};

module.exports = { getAll, push, update, deleteUser };
