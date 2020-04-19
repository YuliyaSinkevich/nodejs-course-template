const User = require('./user.model');

const getAll = async () => {
  return User.find({});
};

const getById = async id => {
  return User.findOne({ _id: id });
};

const add = async user => {
  return User.create(user);
};

const update = async (id, newUser) => {
  return User.updateOne({ _id: id }, newUser);
};

const deleteUser = async id => {
  return User.deleteOne({ _id: id });
};

module.exports = { getAll, getById, add, update, deleteUser };
