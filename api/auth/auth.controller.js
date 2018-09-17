const jwt = require('jsonwebtoken');
// const httpStatus = require('http-status');
// const APIError = require('../helpers/APIError');
const authError = require('../helpers/AuthError');
const config = require('../config');

async function login(req, res, next) {
  // const email = req.body.email;
  // const user = await User.findOne({ email }).populate('role');
  // if (!user) {
  //   const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
  //   return next(err);
  // }

  const passwordVerified = true;

  if (passwordVerified) {
    const token = jwt.sign({
      email: req.body.email,
    }, config.jwtSecret);
    return res.json({
      token,
    });
  }
  const err = authError();
  return next(err);
}

module.exports = { login };
