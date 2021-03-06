const boardsRepo = require('./board.db.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();

const getBoard = async boardId => boardsRepo.getBoard(boardId);

const push = async board => boardsRepo.add(board);

const updateBoard = (boardId, newBoard) => boardsRepo.update(boardId, newBoard);

const deleteBoard = async boardId => {
  await tasksService.deleteTasksByBoardId(boardId);
  await boardsRepo.deleteBoard(boardId);
};

module.exports = { getAll, getBoard, push, updateBoard, deleteBoard };
