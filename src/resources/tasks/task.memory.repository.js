// instead of .json file
var tasks = [

];

const getAll = async () => {
  return tasks;
};

const push = async (task) => {
  tasks.push(task);
};

module.exports = { getAll, push };
