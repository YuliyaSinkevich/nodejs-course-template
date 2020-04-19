const Board = require('./board.model');

const add = async board => {
  return Board.create(board);
};

const getAll = async () => {
  return Board.find({});
};

const getBoard = async boardId => {
  return Board.findOne({ _id: boardId });
};

const update = async (boardId, newBoard) => {
  return Board.updateOne({ _id: boardId }, newBoard);
};

const deleteBoard = async boardId => {
  return Board.deleteOne({ _id: boardId });
};

module.exports = { add, getAll, getBoard, update, deleteBoard };
