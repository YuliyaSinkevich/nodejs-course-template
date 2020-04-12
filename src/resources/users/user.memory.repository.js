// instead of .json file
var users = [
  {
    "id": "1",
    "name": "USER",
    "login": "user"
  },
  {
    "id": "2",
    "name": "USER",
    "login": "user"
  }
];

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return users;
};

const push = async (user) => {
  users.push(user);
};

const deleteUser = async (id) => {
  users = users.filter(user => user.id !== id);
};

module.exports = { getAll, push, deleteUser };
