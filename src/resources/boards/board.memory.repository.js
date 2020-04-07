// instead of .json file
var boards = [];

const getAll = async () => {
  return boards;
};

const push = async (board) => {
  await boards.push(board);
};

const deleteBoard = async (id) => {
  boards = boards.filter(board => board.id !== id);
};

module.exports = { getAll, push, deleteBoard };
