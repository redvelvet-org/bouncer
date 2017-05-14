const { test } = require('ava');
const sinon = require('sinon');
const auth = require('../../../src/controllers/auth');

test('Should respond', async t => {
  const req = { params: { name: 'hey' } };
  const rep = sinon.stub();
  await auth.login(req, rep);
  t.is(rep.callCount, 1);
});
