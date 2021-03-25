const MongoLib = require('../lib/mongodb');
const bcrypt = require('bcrypt');

class UserMoviesService {
  constructor() {
    this.collection = 'user-movies';
    this.mongoDB = new MongoLib();
  }

  async getUserMovies({ userId }) {
    const query = userId && { userId };
    const userMovies = await this.mongoDB.getAll(this.collection, query);
    return userMovies || { data: [], count: 0, totalCount: 0 };
  }

  async addUserMovie({userMovie}) {
    const createdUserMovieId = await this.mongoDB.create(
      this.collection,
      userMovie
    );
    return createdUserMovieId;
  }

  async deleteUserMovie({ userMovieId }) {
    const deletedUserMovieId = await this.mongoDB.delete(
      this.collection,
      userMovieId
    );

    return deletedUserMovieId;
  }
}

module.exports = UserMoviesService;
