// const { moviesMock } = require('../data/movies');
const MongoLib = require('../lib/mongodb');
class MoviesService {
  constructor() {
    this.collection = 'movies';
    this.mongoDB = new MongoLib();
  }

  async getMovies({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const movies = await this.mongoDB.getAll(this.collection, query);
    return movies || [];
  }

  async getMovie(id) {
    const movie = await this.mongoDB.get(this.collection, id);
    return movie || {};
  }

  async createMovie(data) {
    const createdMovieId = await this.mongoDB.create(this.collection, data)
    return createdMovieId;
  }

  async updateMovie(id, data) {
    const updatedMovieId = await this.mongoDB.update(this.collection, id, data);
    return updatedMovieId;
  }

  async deleteMovie(id) {
    const deletedMovieId = await this.mongoDB.delete(this.collection, id);
    return deletedMovieId;
  }
}

module.exports = MoviesService;
