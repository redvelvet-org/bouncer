const bluebird = require('bluebird');
const redis = require('redis');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient(process.env.REDIS_URL);

client.on('error', (err) => {
  throw new Error(err);
});

process.on('exit', (code) => {
  client.quit();
});

module.exports = client;
