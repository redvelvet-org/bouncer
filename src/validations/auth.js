const Joi = require('joi');

const validId = Joi.string().guid().description('User ID');
const validEmail = Joi.string().email().description('Email');
const validFirstName = Joi.string().alphanum().min(3).max(30);
const validLastName = Joi.string().alphanum().min(3).max(30);
const validPassword = Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/);


const login = {
  description: 'Login API',
  notes: 'User login action',
  tags: ['api'],
  validate: {
    payload: {
      email: validEmail.required(),
      password: validPassword.required()
    }
  }
};

const logout = {
  description: 'Logout API',
  notes: 'User logout action',
  tags: ['api'],
  validate: {
    params: {
      id: validId.required()
    }
  }
};

const resetPassword = {
  description: 'Reset password',
  notes: 'Reset user password',
  tags: ['api'],
  validate: {
    params: {
      id: validId.required()
    },
    payload: {
      email: validEmail.required(),
      password: validPassword.required()
    }
  }
};

const signup = {
  description: 'Sign-up',
  notes: 'New user Signup',
  tags: ['api'],
  validate: {
    payload: {
      email: validEmail.required(),
      password: validPassword.required(),
      firstName: validFirstName.required(),
      lastName: validLastName.required()
    }
  }
};

module.exports = {
  login,
  logout,
  resetPassword,
  signup
};
