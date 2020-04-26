// https://fullstackopen.com/en/part4/token_authentication
const router = require('express').Router();
const { BAD_REQUEST } = require('../logging/constants');
const { ErrorHandler, handleErrors } = require('../logging');
const createJWT = require('./login.service');

router.route('/').post(
  handleErrors(async (req, res) => {
    if (!req.body.login || !req.body.password) {
      throw new ErrorHandler(BAD_REQUEST.code, BAD_REQUEST.message);
    }

    const tokenToRequest = await createJWT(req, res);
    res.status(200).json(tokenToRequest);
  })
);

module.exports = router;
