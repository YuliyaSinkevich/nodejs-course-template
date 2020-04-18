// instead of .json file
let tasks = [];

const getAll = async () => {
  return tasks;
};

const getTask = async taskId => tasks.find(task => task.id === taskId);

const push = async task => {
  tasks.push(task);
};

const update = async (taskId, newTask) => {
  const index = await tasks.findIndex(item => item.id === taskId);
  tasks[index] = newTask;
};

const unassignTasks = async userId => {
  const tasksToUpdate = tasks.filter(task => task.userId === userId);
  tasksToUpdate.map(task => update(task, (task.userId = null)));
};

const deleteTask = async taskId => {
  tasks = tasks.filter(task => task.id !== taskId);
};

module.exports = { getAll, getTask, push, update, unassignTasks, deleteTask };
