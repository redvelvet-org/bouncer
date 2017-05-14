const Hapi = require('hapi');
const plugins = require('./src/plugins');
const routes = require('./src/routes');
const auth = require('./src/plugins/auth');

const server = new Hapi.Server();

server.connection({
  host: '0.0.0.0',
  port: process.env.PORT
});

server.register(plugins, (err) => {
  if (err) throw err;
});

server.auth.strategy('jwt', 'jwt', {
  key: process.env.AUTH_SECRET_KEY,
  validateFunc: auth.validation,
  verifyOptions: { algorithms: [ 'HS256' ] }
});

server.auth.default('jwt');

routes.forEach(route => {
  server.route(route);
});

server.start((err) => {
  if (err) {
    throw err;
  }
  server.log('info', `Server running at: ${server.info.uri}`);
});

module.exports = server;
