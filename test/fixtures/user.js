const faker = require('faker');
const bcrypt = require('bcrypt');
const model = require('../../src/models');

const saltRounds = 10;
const createHash = (password) => bcrypt.hash(password, saltRounds);

const createNewUser = async (params) => {
  const hash = await createHash(params.password);

  const user = await model.User.create({
    firstName: params.firstName || faker.name.firstName(),
    lastName: params.lastName || faker.name.lastName(),
    email: params.email || faker.internet.email(),
    hash
  });

  return user;
};

module.exports = createNewUser;
