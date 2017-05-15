const bcrypt = require('bcrypt');
const Boom = require('boom');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');

const login = async ({
  firstName,
  lastName,
  email,
  password
}) => {
  const user = await User.findOne({
    where: {
      email
    }
  });

  if (!user) {
    throw Boom.notFound('User not found');
  }

  const res = await bcrypt.compare(password, user.hash);
  if (!res) {
    throw Boom.unauthorized('Not authorized');
  }

  const token = jwt.sign({
    userId: user.id
  }, 'superSecret', {
    expiresIn: 60 * 60 * 7
  });

  return {
    success: true,
    message: 'Enjoy your token!',
    token
  };
};

module.exports = login;
