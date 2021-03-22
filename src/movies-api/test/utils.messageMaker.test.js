const assert = require('assert');
const messageMaker = require('../utils/messageMaker');

describe('utils - messageMaker', function () {
  describe('list entity', function () {
    it('should return "movies listed"', function () {
      const result = messageMaker('movie', 'list');
      const expected = 'movies listed';
      assert.strictEqual(result, expected);
    });

    it('should return "actors listed"', function () {
      const result = messageMaker('actor', 'list');
      const expected = 'actors listed';
      assert.strictEqual(result, expected);
    });
  });

  describe('create entity', function () {
    it('should return "movie created"', function () {
      const result = messageMaker('movie', 'create');
      const expected = 'movie created';
      assert.strictEqual(result, expected);
    });
  });

  describe('update entity', function () {
    it('should return "movie updated"', function () {
      const result = messageMaker('movie', 'update');
      const expected = 'movie updated';
      assert.strictEqual(result, expected);
    });

    it('should return "actor updated"', function () {
      const result = messageMaker('actor', 'update');
      const expected = 'actor updated';
      assert.strictEqual(result, expected);
    });
  });
});
