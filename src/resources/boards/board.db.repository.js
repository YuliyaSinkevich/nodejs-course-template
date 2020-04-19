const Board = require('./board.model');

const add = async board => {
  return Board.create(board);
};

const getAll = async () => {
  return Board.find({});
};

const getBoard = async id => {
  return Board.findOne({ _id: id });
};

const update = async (id, newBoard) => {
  return Board.updateOne({ _id: id }, newBoard);
};

const deleteBoard = async id => {
  return Board.deleteOne({ _id: id });
};

module.exports = { add, getAll, getBoard, update, deleteBoard };
