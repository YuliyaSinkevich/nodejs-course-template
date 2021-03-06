module.exports = {
  BAD_REQUEST: {
    code: 400,
    message: 'Bad request'
  },

  ACCESS_TOKEN_IS_MISSING_OR_INVALID: {
    code: 401,
    message: 'Access token is missing or invalid'
  },

  FORBIDDEN: {
    code: 403,
    message: 'Forbidden'
  },

  NOT_FOUND: {
    code: 404,
    message: 'Not Found'
  },

  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: 'Internal Server Error'
  },

  UNKNOWN_ERROR: {
    code: 520,
    message: 'Unknown Error'
  }
};
