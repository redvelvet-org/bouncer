const loginAction = require('../services/auth/login');

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

const signup = (request, reply) => {
  reply(`hello ${request.params.name}`);
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
