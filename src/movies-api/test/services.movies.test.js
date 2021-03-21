const assert = require('assert');
const proxyquire = require('proxyquire');
const { MongoLibMock, getAllStub } = require('../mocks/mongoLib');
const { moviesMock } = require('../mocks/movies');

describe('services - movies', function () {
  const MoviesServices = proxyquire('../services/movies', {
    '../lib/mongodb': MongoLibMock,
  });

  const moviesService = new MoviesServices();

  describe('when getMovies method is called', async function () {
    it('should call the getAll MongoLib Method', async function () {
      await moviesService.getMovies({});
      assert.strictEqual(getAllStub.called, true);
    });

    it('should return an array of movies', async function () {
      const movies = await moviesService.getMovies({});

      const expected = moviesMock;

      assert.strictEqual(movies, expected);
    });
  });
});
