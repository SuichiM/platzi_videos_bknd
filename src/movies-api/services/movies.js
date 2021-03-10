const { moviesMock } = require('../data/movies');

class MoviesService {

  async getMovies(){
    const movies = await Promise.resolve(moviesMock);
    return movies || []
  }

  async getMovie(id){
    const movie = await Promise.resolve(moviesMock[id]);
    return movie || {}
  }

  async createMovie(data){
    const createdMovieId = await Promise.resolve(moviesMock[0].id);
    return createdMovieId;
  }

  async updateMovie(id, data){
    const updatedMovieId = await Promise.resolve(moviesMock[0].id);
    return updatedMovieId;
  }

  async deleteMovie(id){
    const deletedMovieId = await Promise.resolve(moviesMock[0]);
    return deletedMovieId;
  }
}

module.exports = MoviesService