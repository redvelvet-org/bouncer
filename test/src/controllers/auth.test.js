const request = require('supertest');
const { test } = require('ava');
const server = require('../../../');
const newUser = require('../../fixtures/user');

test('Should respond with 404 no login', async t => {
  const res = await request(server.listener).post('/login').send({
    email: 'hey@hey.com', password: 'helloThere'
  });
  t.is(res.status, 404);
});

test('Should respond with 200 ok', async t => {
  const user = await newUser({ password: 'abc123d' });
  const res = await request(server.listener).post('/login').send({
    email: user.email, password: 'abc123d'
  });
  t.is(res.status, 200);
});

test('Should respond with 401 on wrong password', async t => {
  const user = await newUser({ password: 'abc123dd' });
  const res = await request(server.listener).post('/login').send({
    email: user.email, password: 'abc123d'
  });
  t.is(res.status, 401);
});
