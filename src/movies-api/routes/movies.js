const express = require('express');
const { moviesMock } = require('../data/movies');

function moviesApi(app) {
  const router = express.Router();
  app.use('/api/movies', router);

  /**
   * GET movie collection
   */
  router.get('/', async (req, res, next) => {
    try {
      const movies = await Promise.resolve(moviesMock);
      res.status(200).json({
        data: movies,
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
      const movie = await Promise.resolve(moviesMock[id]);

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
      const { body } = req;

      console.log(body);

      const createdMovieId = await Promise.resolve(moviesMock[0]);

      res.status(200).json({
        data: createdMovieId,
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

      const updatedMovie = await Promise.resolve(moviesMock[id]);

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

      const deletedMovieId = await Promise.resolve(moviesMock[id]);

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
