const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
})
  .post(async (req, res) => {
    const user = new User(req.body);
    usersService.push(user);

    res.json(User.forBrokenTestPost(user));
  });

router.route('/:id')
  .get(async (req, res) => {
    const user = await usersService.getUser(req.params.id);
    // console.log('req.params', req.params);
    // console.log('req.body', req.body);
    // console.log('user', user);
    res.json(User.toResponse(user));
  })
  .put(async (req, res) => {
    const user = await usersService.getUser(req.params.id, res);
    usersService.update(req.params.id, req.body);
    res.json(User.toResponse(user));
  });

module.exports = router;
