const Boom = require('boom');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');

const forgotPassword = async ({
  email
}) => {
  const user = await User.findOne({
    where: {
      email
    }
  });

  if (!user) {
    throw Boom.notFound('User not found');
  }

  const token = jwt.sign({
    userId: user.id
  }, process.env.AUTH_SECRET_KEY, {
    expiresIn: 60 * 60 * 7
  });

  await User.update({
    passwordResetToken: token,
    passwordResetSentAt: new Date()
  }, {
    where: {
      id: user.id
    }
  });
  // replace with email later
  return {
    token
  };
};

module.exports = forgotPassword;
