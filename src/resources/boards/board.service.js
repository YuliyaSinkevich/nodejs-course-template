const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const getBoard = async (id) => {
  return await boardsRepo.getAll().then(boards => {
    return boards.find((board) => board.id === id);
  });
};

const push = async (board) => boardsRepo.push(board);

const updateBoard = async (id, req) => {
  getBoard(id)
    .then(board => board.title = req.title);
};

const deleteBoard = async (id) => boardsRepo.deleteBoard(id);

module.exports = { getAll, getBoard, push, updateBoard, deleteBoard };
