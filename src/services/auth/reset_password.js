const Boom = require('boom');
const moment = require('moment');
const { User } = require('../../models');
const { createHash } = require('./signup');

const resetPassword = async ({
  password
}, token) => {
  const user = await User.findOne({
    where: {
      passwordResetToken: token
    }
  });

  if (!user) {
    throw Boom.notFound('User not found');
  }

  if (moment.duration(moment().diff(moment(user.passwordResetSentAt))).asDays() > 2) {
    throw Boom.badData('Invalid token');
  }

  const hash = await createHash(password);

  await User.update({
    hash
  }, {
    where: {
      id: user.id
    }
  });

  return {
    success: true,
    message: 'Password changed'
  };
};

module.exports = resetPassword;
