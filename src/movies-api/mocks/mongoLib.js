const sinon = require('sinon');

const { moviesMock, filteredMoviesMock } = require('../mocks/movies');
const { usersMock, filteredUsersMock } = require('./users');

const getAllStub = sinon.stub();

/*getAll movies */
getAllStub.withArgs('movies').resolves(moviesMock);

/*getAll movies with filters */
const tagQuery = { tags: { $in: ['Drama'] } };
getAllStub.withArgs('movies', tagQuery).resolves(filteredMoviesMock('Drama'));

/**getAll users */
getAllStub.withArgs('users').resolves(usersMock);

/*getAll users with filters */
const emailQuery = {email: 'suichi@suichi.com'}
getAllStub.withArgs('users', emailQuery).resolves(filteredUsersMock('suichi@suichi.com'))


const createStub = sinon.stub().resolves(moviesMock[0].id);

class MongoLibMock {
  getAll(collection, query) {
    return getAllStub(collection, query);
  }
  create(collection, query) {
    return createStub(collection, query);
  }
}

module.exports = {
  getAllStub,
  createStub,
  MongoLibMock,
};
