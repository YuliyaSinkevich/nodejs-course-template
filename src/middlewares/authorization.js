// Whenever the user wants to access a protected route or resource, the user agent should send the JWT,
// typically in the Authorization header using the Bearer schema
// The content of the header should look like the following: Authorization: Bearer <token>
const { ErrorHandler } = require('../resources/logging');
const { ACCESS_TOKEN_IS_MISSING_OR_INVALID } = require('../resources/logging/constants');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');

const authorization = (req, res, next) => {
  const authorization = req.get('authorization');

  if (!(authorization && authorization.toLowerCase().startsWith('bearer '))) {
    throw new ErrorHandler(
      ACCESS_TOKEN_IS_MISSING_OR_INVALID.code,
      ACCESS_TOKEN_IS_MISSING_OR_INVALID.message
    );
  } else {
    const token = authorization.substring(7);
    const decodedToken = jwt.verify(token, JWT_SECRET_KEY);

    if (!token || !decodedToken.id) {
      throw new ErrorHandler(
        ACCESS_TOKEN_IS_MISSING_OR_INVALID.code,
        ACCESS_TOKEN_IS_MISSING_OR_INVALID.message
      );
    }

    next();
  }
};

module.exports = authorization;
