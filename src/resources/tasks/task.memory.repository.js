// instead of .json file
let tasks = [];

const getAll = async () => {
  return tasks;
};

const push = async task => {
  tasks.push(task);
};

const update = async (taskId, newTask) => {
  const index = await tasks.findIndex(item => item.id === taskId);
  tasks[index] = newTask;
};

const deleteTask = async (taskId, boardId) => {
  tasks = tasks.filter(task => task.id !== taskId);
};

module.exports = { getAll, push, update, deleteTask };
