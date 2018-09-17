const httpStatus = require('http-status');
const APIError = require('./APIError');

module.exports = function() {
  return new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
}