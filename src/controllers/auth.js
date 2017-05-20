const loginAction = require('../services/auth/login');
const signupAction = require('../services/auth/signup');
const resetPasswordAction = require('../services/auth/reset_password');
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
    const resp = await signupAction(request.payload);
    reply(resp);
  } catch (ex) {
    reply(ex);
  }
};

const resetPassword = async (request, reply) => {
  try {
    const resp = await resetPasswordAction(request.payload);
    reply(resp);
  } catch (ex) {
    reply(ex);
  }
};

const profile = async (request, reply) => {
  try {
    const resp = await profileAction(request.payload);
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
  profile
};
