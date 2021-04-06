const express = require('express');
const passport = require('passport');

// SERVICES
const MoviesService = require('../services/movies');

// SCHEMAS
const {
  movieIdSchema,
  createSchema,
  updateSchema,
} = require('../schemas/movies');

// UTILS
const messageMaker = require('../utils/messageMaker');
const validationHandler = require('../middleware/validationHandler');
const cacheResponse = require('../utils/cacheResponse');

// PARAMS
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS,
} = require('../config/params');

// JWT stragegy
const jwt = require('../utils/auth/strategies/jwt');

function moviesApi(app) {
  const ENTITY = 'movie';

  const router = express.Router();
  app.use('/api/movies', router);
  const moviesServices = new MoviesService();

  /**
   * GET movie collection
   */
  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      try {
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS);

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
    }
  );

  /**
   * GET single movie
   */
  router.get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    validationHandler({ id: movieIdSchema }, 'params'),
    async (req, res, next) => {
      try {
        cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);

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
  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    validationHandler(createSchema),
    async (req, res, next) => {
      try {
        const { body: movieData } = req;

        const createdMovie = await moviesServices.createMovie(movieData);

        const message = messageMaker(ENTITY, 'create');

        res.status(201).json({
          data: createdMovie,
          message,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  /**
   * PUT update movie
   */
  router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
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
    //validationHandler({ id: movieIdSchema }, 'params'),
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
