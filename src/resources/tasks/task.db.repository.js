const Task = require('./task.model');

const add = async task => {
  return Task.create(task);
};

const getAll = async () => {
  return Task.find({});
};

const getTask = async id => {
  return Task.findOne({ _id: id });
};

const update = async (id, newTask) => {
  return Task.updateOne({ _id: id }, newTask);
};

const unassignTasks = async id => {
  const tasksToUpdate = await getTask(id);
  return Task.updateMany(tasksToUpdate, { userId: null });
};

const deleteTask = async id => {
  return Task.deleteOne({ _id: id });
};

module.exports = { add, getAll, getTask, update, unassignTasks, deleteTask };
