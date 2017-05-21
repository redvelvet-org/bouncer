const loginAction = require('../services/auth/login');
const signupAction = require('../services/auth/signup');
const resetPasswordAction = require('../services/auth/reset_password');
const forgotPasswordAction = require('../services/auth/forgot_password');
const profileAction = require('../services/auth/profile');

const login = async (request, reply) => {
  try {
    const resp = await loginAction(request.payload);
    reply(resp);
  } catch (ex) {
    reply(ex);
  }
};

const logout = async (request, reply) => {
  try {
    const resp = await loginAction(request.payload);
    reply(resp);
  } catch (ex) {
    reply(ex);
  }
};

const signup = async (request, reply) => {
  try {
    const resp = await signupAction.signup(request.payload);
    reply(resp);
  } catch (ex) {
    reply(ex);
  }
};

const resetPassword = async (request, reply) => {
  try {
    const resp = await resetPasswordAction(request.payload, request.query.resetToken);
    reply(resp);
  } catch (ex) {
    reply(ex);
  }
};

const forgotPassword = async (request, reply) => {
  try {
    const resp = await forgotPasswordAction(request.payload);
    reply(resp);
  } catch (ex) {
    reply(ex);
  }
};

const profile = async (request, reply) => {
  try {
    const resp = await profileAction(request.params);
    reply(resp);
  } catch (ex) {
    reply(ex);
  }
};

module.exports = {
  login,
  logout,
  signup,
  resetPassword,
  forgotPassword,
  profile
};
