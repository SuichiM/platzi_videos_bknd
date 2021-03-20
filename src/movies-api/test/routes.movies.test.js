const assert = require('assert');
const proxyquire = require('proxyquire');
const { moviesMock, MoviesServiceMock } = require('../mocks/movies');
const testServer = require('../utils/testServer');

describe('routes - movies', function () {

  const route = proxyquire('../routes/movies', {
    '../services/movies': MoviesServiceMock,
  });

  const request = testServer(route);

  describe('GET /movies', function () {
    it('should respond with status 200', function (done) {
      request.get('/api/movies').expect(200, done);
    });

    it('should respond with the list of movies', function (done) {
      request.get('/api/movies').end((err, res) => {
      
        assert.deepStrictEqual(res.body, {
          data: moviesMock,
          count: moviesMock.length,
          totalCount: moviesMock.length,
          message: 'movies listed',
        });

        done();
      });
    });
  });
});
