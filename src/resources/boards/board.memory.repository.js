// instead of .json file
let boards = [];

const getAll = async () => {
  return boards;
};

const push = async board => {
  await boards.push(board);
};

const update = async (boardId, newBoard) => {
  const index = await boards.findIndex(item => item.id === boardId);
  boards[index] = newBoard;
};

const deleteBoard = async id => {
  boards = boards.filter(board => board.id !== id);
};

module.exports = { getAll, push, update, deleteBoard };
