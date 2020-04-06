const router = require('express').Router();
const User = require('./user.model');
const Board = require('../boards/board.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
})
  .post(async (req, res) => {
    const user = await new User(req.body);
    await usersService.push(user);
    res.json(User.forBrokenTestPost(user));
  });

router.route('/:id')
  .get(async (req, res) => {
    const user = await usersService.getUser(req.params.id);
    res.json(User.toResponse(user));
  })
  .put(async (req, res) => {
    const user = await usersService.getUser(req.params.id, res);
    await usersService.updateUser(req.params.id, req.body);
    res.json(User.toResponse(user));
  })
  .delete(async (req, res) => {
    await usersService.deleteUser(req.params.id);
    res.status(204).send('The user has been deleted');
  });

module.exports = router;
