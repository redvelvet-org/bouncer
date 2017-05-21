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

test('Login: Should respond with 404 on no user', async t => {
  await newUser({ password: 'abc123dd' });
  const res = await request(server.listener).post('/login').send({
    email: 'someone@else.com', password: 'abc123d'
  });
  t.is(res.status, 404);
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

test('Signup: Should respond with 400 on valid request', async t => {
  const user = await newUser({ password: 'abc123dd' });
  const res = await request(server.listener).post('/signup').send({
    email: user.email,
    password: 'abc123dd',
    firstName: 'abcs',
    lastName: 'jdkjds'
  });
  console.log(res.status);
  t.is(res.status, 422);
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

test('Get profile: Should respond with 200 on valid request', async t => {
  const user = await newUser({ password: 'abc123dd' });
  let res = await request(server.listener).post('/login').send({
    email: user.email, password: 'abc123dd'
  });
  res = await request(server.listener).get(`/user/${user.id}`).send({
    email: user.email
  }).set('Authorization', res.body.token);
  t.is(res.status, 200);
  t.is(res.body.email, user.email);
});

test('Get profile: Should respond with 404 on invalid request', async t => {
  const user = await newUser({ password: 'abc123dd' });
  let res = await request(server.listener).post('/login').send({
    email: user.email, password: 'abc123dd'
  });
  res = await request(server.listener).get(`/user/35803510-69a3-43b1-a421-57cd795cd905`).send({
    email: user.email
  }).set('Authorization', res.body.token);
  t.is(res.status, 404);
});
