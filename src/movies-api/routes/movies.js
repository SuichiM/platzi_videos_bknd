const express = require('express');
const MoviesService = require('../services/movies');

const {
  movieIdSchema,
  createSchema,
  updateSchema,
} = require('../schemas/movies');

const messageMaker = require('../utils/messageMaker');

const validationHandler = require('../middleware/validationHandler');

function moviesApi(app) {
  const ENTITY = 'movie';

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
      const message = messageMaker(ENTITY, 'list');
      res.status(200).json({
        ...movies,
        message,
      });
    } catch (error) {
      next(error);
    }
  });

  /**
   * GET single movie
   */
  router.get(
    '/:id',
    validationHandler({ id: movieIdSchema }, 'params'),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        // console.log(id);
        const movie = await moviesServices.getMovie(id);
        const message = messageMaker(ENTITY, 'retrieve');

        res.status(200).json({
          data: movie,
          message,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  /**
   * POST create movie
   */
  router.post('/', validationHandler(createSchema), async (req, res, next) => {
    try {
      const { body: movieData } = req;

      console.log(movieData);

      const createdMovie = await moviesServices.createMovie(movieData);

      const message = messageMaker(ENTITY, 'create');

      res.status(201).json({
        data: createdMovie,
        message,
      });
    } catch (error) {
      next(error);
    }
  });

  /**
   * PUT update movie
   */
  router.put(
    '/:id',
    validationHandler({ id: movieIdSchema }, 'params'),
    validationHandler(updateSchema),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const { body: movieData } = req;

        const updatedMovie = await moviesServices.updateMovie(id, movieData);
        const message = messageMaker(ENTITY, 'update');

        res.status(200).json({
          data: updatedMovie,
          message,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:id',
    validationHandler({ id: movieIdSchema }, 'params'),
    async (req, res, next) => {
      try {
        const { id } = req.params;

        const deletedMovieId = await moviesServices.deleteMovie(id);
        const message = messageMaker(ENTITY, 'delete');

        res.status(200).json({
          data: deletedMovieId,
          message,
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = moviesApi;
