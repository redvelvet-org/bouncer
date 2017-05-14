const { User } = require('../models');

const login = async (request, reply) => {
  reply(`hello ${request.params.name}`);
};

const logout = (request, reply) => {
  reply(`Hello ${request.params.name}`);
};

const signup = (request, reply) => {
  reply(`hello ${request.params.name}`);
};

const resetPassword = (request, reply) => {
  reply(`hello ${request.params.name}`);
};

const profile = (request, reply) => {
  const { token } = request.auth;
  request.log.info('hERE', token, User);
  reply(`hello ${request.params.name}`);
};

module.exports = {
  login,
  logout,
  signup,
  resetPassword,
  profile
};
