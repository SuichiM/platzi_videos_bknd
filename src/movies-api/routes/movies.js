const express = require('express');
const MoviesService = require('../services/movies');

function moviesApi(app) {
  const router = express.Router();
  app.use('/api/movies', router);
  const moviesServices = new MoviesService();

  /**
   * GET movie collection
   */
  router.get('/', async (req, res, next) => {
    try {
      const { tags: tagsString } = req.query;
      let tags = tagsString && tagsString.split('|');
      const movies = await moviesServices.getMovies({ tags });
      res.status(200).json({
        ...movies,
        message: 'movies listed',
      });
    } catch (error) {
      next(error);
    }
  });

  /**
   * GET single movie
   */
  router.get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      // console.log(id);
      const movie = await moviesServices.getMovie(id);

      res.status(200).json({
        data: movie,
        message: 'movie listed',
      });
    } catch (error) {
      next(error);
    }
  });

  /**
   * POST create movie
   */
  router.post('/', async (req, res, next) => {
    try {
      const { body: movieData } = req;

      console.log(movieData);

      const createdMovie = await moviesServices.createMovie(movieData);

      res.status(201).json({
        data: createdMovie,
        message: 'movie created',
      });
    } catch (error) {
      next(error);
    }
  });

  /**
   * PUT update movie
   */
  router.put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body: movieData } = req;

      const updatedMovie = await moviesServices.updateMovie(id, movieData);

      res.status(200).json({
        data: updatedMovie,
        message: 'movie updated',
      });
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;

      const deletedMovieId = await moviesServices.deleteMovie(id);

      res.status(200).json({
        data: deletedMovieId,
        message: 'movie deleted',
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = moviesApi;
