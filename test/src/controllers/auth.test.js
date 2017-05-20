const request = require('supertest');
const { test } = require('ava');
const server = require('../../../');
const newUser = require('../../fixtures/user');
const faker = require('faker');

test('Login: Should respond with 404 no', async t => {
  const res = await request(server.listener).post('/login').send({
    email: 'hey@hey.com', password: 'helloThere'
  });
  t.is(res.status, 404);
});

test('Login: Should respond with 200 ok', async t => {
  const user = await newUser({ password: 'abc123d' });
  const res = await request(server.listener).post('/login').send({
    email: user.email, password: 'abc123d'
  });
  t.is(res.status, 200);
});

test('Login: Should respond with 401 on wrong password', async t => {
  const user = await newUser({ password: 'abc123dd' });
  const res = await request(server.listener).post('/login').send({
    email: user.email, password: 'abc123d'
  });
  t.is(res.status, 401);
});

test('Signup: Should respond with 200 on valid request', async t => {
  const res = await request(server.listener).post('/signup').send({
    email: faker.internet.email(),
    password: 'abc123d',
    firstName: 'abcs',
    lastName: 'jdkjds'
  });
  t.is(res.status, 200);
  t.is(res.body.message, 'Welcome to Redvelvet');
});

test('Resetpassword: Should respond with 200 on valid request', async t => {
  const user = await newUser({ password: 'abc123dd' });
  let res = await request(server.listener).post('/forgot-password').send({
    email: user.email
  });
  res = await request(server.listener).post('/reset-password').query({
    resetToken: res.body.token
  }).send({
    password: 'mynewPassword123'
  });
  t.is(res.status, 200);
});

test('Forgot Password: Should respond with 200 on valid request', async t => {
  const user = await newUser({ password: 'abc123dd' });
  const res = await request(server.listener).post('/forgot-password').send({
    email: user.email
  });
  t.is(res.status, 200);
  t.truthy(res.body.token);
});
