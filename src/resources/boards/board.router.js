const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards);
})
  .post(async (req, res) => {
    const board = await new Board(req.body);
    await boardsService.push(board);
    res.json(board);
  });

router.route('/:id')
  .get(async (req, res) => {
    const board = await boardsService.getBoard(req.params.id);
    res.json(board);
  })
  .put(async (req, res) => {
    const board = await boardsService.getBoard(req.params.id);
    await boardsService.updateBoard(req.params.id, req.body);
    res.json(board);
  })
  .delete(async (req, res) => {
    // TODO
    if (!req.params.id) {
      res.status(401).send('Access token is missing or invalid');
    }

    const board = await boardsService.getBoard(req.params.id);

    if (!board) {
      res.status(404).send('Board not found');
    }

    await boardsService.deleteBoard(req.params.id);
    res.status(204).send('The board and all its tasks has been deleted');
  });

module.exports = router;
