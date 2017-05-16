const auth = require('hapi-auth-jwt2');
const moment = require('moment');
const redis = require('../lib/redis');

const validation = (decoded, request, cb) => {
  const { userId, exp } = decoded;

  if (moment.unix(exp).isBefore(moment())) {
    return cb(null, false);
  }

  if (decoded.userId) {
    return redis.hgetallAsync(userId)
      .then(res => cb(null, true))
      .catch(e => cb(e, false));
  }
  return cb(null, false);
};

module.exports = {
  auth,
  validation
};
