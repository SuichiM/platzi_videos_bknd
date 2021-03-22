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

  describe('POST /movies', function () {
    const movieData = { ...moviesMock[0] };
    const id = movieData['id'];
    delete movieData['id'];

    it('should respond with status 201', function (done) {
      request.post('/api/movies').send(movieData).expect(201, done);
    });

    it('should respond with data of the created movie', function (done) {
      request
        .post('/api/movies')
        .send(movieData)
        .end((err, res) => {
          assert.deepStrictEqual(res.body, {
            data: { id, ...movieData },
            message: 'movie created',
          });

          done();
        });
    });
  });

  describe('DELETE /movies', function () {
    const id = moviesMock[0].id;
    const url = `/api/movies/${id}`;
    it('should respond with status 200', function (done) {
      request.delete(url).expect(200, done);
    });

    it('should respond with deleted movie ID', function (done) {
      request.delete(url).end((err, res) => {
        assert.deepStrictEqual(res.body, {
          data: id,
          message: 'movie deleted',
        });

        done();
      });
    });
  });
});
