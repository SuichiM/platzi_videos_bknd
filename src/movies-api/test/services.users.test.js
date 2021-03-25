const assert = require('assert');
const proxyquire = require('proxyquire');
const { MongoLibMock, getAllStub } = require('../mocks/mongoLib');
const { usersMock } = require('../mocks/users');

describe('services - users', function () {
  const UsersServices = proxyquire('../services/users', {
    '../lib/mongodb': MongoLibMock,
  });

  const userService = new UsersServices();

  describe('when getUser method is called', async function () {
    it('should call the getAll MongoLib Method', async function () {
      await userService.getUser({ email: 'suichi@suichi.com' });
      assert.strictEqual(getAllStub.called, true);
    });

    it('should return the user', async function () {
      const expected = usersMock[0];

      const result = await userService.getUser({ email: 'suichi@suichi.com' });

      assert.strictEqual(result, expected);
    });
  });
});
