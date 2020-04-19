// // instead of .json file
// let boards = [];
//
// const getAll = async () => {
//   return boards;
// };
//
// const getBoard = async boardId => boards.find(board => board.id === boardId);
//
// const push = async board => {
//   await boards.push(board);
// };
//
// const update = async (boardId, newBoard) => {
//   const index = await boards.findIndex(item => item.id === boardId);
//   boards[index] = newBoard;
// };
//
// const deleteBoard = async boardId => {
//   boards = boards.filter(board => board.id !== boardId);
// };
//
// module.exports = { getAll, push, getBoard, update, deleteBoard };
