const bluebird = require('bluebird');
const redis = require('redis');
const Boom = require('boom');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient(process.env.REDIS_URL);

client.on('error', (err) => {
  throw Boom.badImplementation(err);
});

process.on('exit', (code) => {
  client.quit();
});

module.exports = client;
