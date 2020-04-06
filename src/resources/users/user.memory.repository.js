// instead of .json file
const users = [
  {
    "id": "1",
    "name": "User1",
    "login": "User1Login",
    "password": "P@55w0rd"
  },
  {
    "id": "2",
    "name": "User2",
    "login": "User2Login",
    "password": "P@55w0rd22"
  }
];

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return users;
};

const push = async (user) => {
  users.push(user);
};

module.exports = { getAll, push };
