const router = require('express').Router();
const { NOT_FOUND } = require('../logging/constants');
const User = require('./user.model');
const usersService = require('./user.service');
const { validateId, ErrorHandler, handleErrors } = require('../logging');

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    res.json(users.map(User.toResponse));
  })
  .post(async (req, res) => {
    const user = await new User(req.body);
    await usersService.push(user);
    res.json(User.forBrokenTestPost(user));
  });

router
  .route('/:id')
  .get(
    handleErrors(async (req, res) => {
      await validateId(req.params.id);

      const user = await usersService.getUser(req.params.id);
      if (!user) throw new ErrorHandler(NOT_FOUND.code, NOT_FOUND.message);

      res.status(200).json(User.toResponse(user));
    })
  )
  .put(
    handleErrors(async (req, res) => {
      await validateId(req.params.id);

      const user = await usersService.getUser(req.params.id);
      if (!user) throw new ErrorHandler(NOT_FOUND.code, NOT_FOUND.message);

      await usersService.updateUser(req.params.id, req.body);
      res.status(200).json(User.toResponse(user));
    })
  )
  .delete(
    handleErrors(async (req, res) => {
      await validateId(req.params.id);

      const user = await usersService.getUser(req.params.id);
      if (!user) throw new ErrorHandler(NOT_FOUND.code, NOT_FOUND.message);

      await usersService.deleteUser(req.params.id);
      res.status(204).send('The user has been deleted');
    })
  );

module.exports = router;
