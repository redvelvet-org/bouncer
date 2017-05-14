const auth = require('hapi-auth-jwt2');

const validation = (decoded, request, cb) => {
  // perform token calidation
  if (decoded) {
    return cb(null, true);
  }
  return cb(null, false);
};

module.exports = {
  auth,
  validation
};
