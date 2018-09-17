const Joi = require('joi');

module.exports = {
  login: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    }
  },
  forgotPassword: {
    body: {
      email: Joi.string().required(),
    }
  },
  resetPassword: {
    body: {
      token: Joi.string().required(),
      password: Joi.string().required(),
    }
  },
  createRole: {
    body: {
      description: Joi.string().required(),
      name: Joi.string().required(),
    }
  }
};
