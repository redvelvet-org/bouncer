const auth = require('../controllers/auth');
const config = require('../validations/auth');

const route = [{
  method: 'POST',
  path: '/login/',
  handler: auth.login,
  config: config.login
}, {
  method: 'DELETE',
  path: '/logout/{id}',
  handler: auth.logout,
  config: config.logout
}, {
  method: 'POST',
  path: '/signup/',
  handler: auth.signup,
  config: config.signup
}, {
  method: 'POST',
  path: '/reset-password/{id}',
  handler: auth.resetPassword,
  config: config.resetPassword
}, {
  method: 'GET',
  path: '/user/{id}',
  handler: auth.profile,
  config: config.profile
}];

module.exports = route;
