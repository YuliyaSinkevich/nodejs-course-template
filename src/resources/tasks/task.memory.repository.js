// instead of .json file
var tasks = [];

const getAll = async () => {
  return tasks;
};

const push = async (task) => {
  tasks.push(task);
};

const deleteTask = async (taskId, boardId) => {
  tasks = tasks.filter(task => task.id !== taskId);
};

module.exports = { getAll, push, deleteTask };
