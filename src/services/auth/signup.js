const bcrypt = require('bcrypt');
const Boom = require('boom');
const { User } = require('../../models');

const saltRounds = 10;

const createHash = async (password) => {
  let hash;
  try {
    hash = await bcrypt.hash(password, saltRounds);
  } catch (ex) {
    throw Boom.badImplementation('Internal error');
  }
  return hash;
};

const signup = async ({
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

  if (user) {
    throw Boom.badData('User already exists');
  }

  const hash = await createHash(password);

  await User.create({
    email,
    hash,
    firstName,
    lastName
  });

  return {
    success: true,
    message: 'Welcome to Redvelvet'
  };
};

module.exports = signup;
