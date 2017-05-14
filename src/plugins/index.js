const inert = require('./inert');
const vision = require('./vision');
const logger = require('./logger');
const swagger = require('./swagger');
const { auth } = require('./auth');

module.exports = [
  inert,
  vision,
  logger,
  swagger,
  auth
];
