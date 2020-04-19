const router = require('express').Router();
const { NOT_FOUND, BAD_REQUEST } = require('../logging/constants');
const Board = require('./board.model');
const boardsService = require('./board.service');
const { validateId, ErrorHandler, handleErrors } = require('../logging');

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardsService.getAll();
    res.status(200).json(boards.map(Board.toResponse));
  })
  .post(async (req, res) => {
    const board = await new Board(req.body);
    await boardsService.push(board);
    await res.status(200).json(Board.toResponse(board));
  });

router
  .route('/:boardId')
  .get(
    handleErrors(async (req, res) => {
      if (!req.params.boardId) {
        throw new ErrorHandler(BAD_REQUEST.code, BAD_REQUEST.message);
      }

      const board = await boardsService.getBoard(req.params.boardId);
      if (!board) throw new ErrorHandler(NOT_FOUND.code, NOT_FOUND.message);

      res.status(200).json(Board.toResponse(board));
    })
  )
  .put(
    handleErrors(async (req, res) => {
      if (!req.params.boardId) {
        throw new ErrorHandler(BAD_REQUEST.code, BAD_REQUEST.message);
      }

      const board = await boardsService.getBoard(req.params.boardId);
      if (!board) throw new ErrorHandler(NOT_FOUND.code, NOT_FOUND.message);

      await boardsService.updateBoard(req.params.boardId, req.body);
      res.status(200).json(Board.toResponse(board));
    })
  )
  .delete(
    handleErrors(async (req, res) => {
      if (!req.params.boardId) {
        throw new ErrorHandler(BAD_REQUEST.code, BAD_REQUEST.message);
      }

      const board = await boardsService.getBoard(req.params.boardId);
      if (!board) throw new ErrorHandler(NOT_FOUND.code, NOT_FOUND.message);

      await boardsService.deleteBoard(req.params.boardId);
      res.status(204).send('The board and all its tasks has been deleted');
    })
  );

module.exports = router;
