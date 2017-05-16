const loginAction = require('../services/auth/login');
const signupAction = require('../services/auth/signup');

const login = async (request, reply) => {
  try {
    const resp = await loginAction(request.payload);
    reply(resp);
  } catch (ex) {
    reply(ex);
  }
};

const logout = async (request, reply) => {
  const resp = await loginAction(request.payload);
  reply(resp);
};

const signup = async (request, reply) => {
  try {
    const resp = await signupAction(request.payload);
    reply(resp);
  } catch (ex) {
    reply(ex);
  }
};

const resetPassword = (request, reply) => {
  reply(`hello ${request.params.name}`);
};

const profile = (request, reply) => {
  // const { token } = request.auth;
  reply(`hello ${request.params.name}`);
};

module.exports = {
  login,
  logout,
  signup,
  resetPassword,
  profile
};
