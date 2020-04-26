// тут создавать токен например
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../users/user.model');
const { JWT_SECRET_KEY } = require('../../common/config');
const { FORBIDDEN } = require('../logging/constants');
const { ErrorHandler } = require('../logging');

const createJWT = async (req, res) => {
  const user = await User.findOne({ login: req.body.login });

  if (!user) throw new ErrorHandler(FORBIDDEN.code, FORBIDDEN.message);

  const passwordCorrect =
    user && (await bcrypt.compare(req.body.password, user.password));

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    });
  }

  const userForToken = {
    login: user.login,
    id: user._id
  };
  const token = jwt.sign(userForToken, JWT_SECRET_KEY);
  return { id: user.id, login: user.login, token };
};

module.exports = createJWT;
