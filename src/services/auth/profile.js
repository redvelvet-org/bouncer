const Boom = require('boom');
const { User } = require('../../models');
const userViewModel = require('../../view_models/user');

const profile = async({
  id
}) => {
  const user = await User.findById(id);
  if (!user) {
    throw Boom.notFound('User not found');
  }

  return userViewModel(user.dataValues);
};

module.exports = profile;
