const express = require('express');
const passport = require('passport');

// SERVICES
const UserMoviesService = require('../services/userMovies');

// SCHEMAS
const { movieIdSchema } = require('../schemas/movies');
const { idSchema: userIdSchema } = require('../schemas/user');
const { idSchema, createUserMovieSchema } = require('../schemas/userMovies');

// UTILS
const validationHandler = require('../middleware/validationHandler');
const scopesValidationHandler = require('../middleware/scopesValidationHandler');

// JWT stragegy
const jwt = require('../utils/auth/strategies/jwt');

function userMoviesApi(app) {
  const router = express.Router();

  app.use('/api/user-movies', router);

  const userMoviesService = new UserMoviesService();

  router.get(
    '/:userId',
    // validationHandler({ userId: userIdSchema }, 'params'),
    scopesValidationHandler(['read:user-movies']),
    async function (req, res, next) {
      const { userId } = req.params;
      try {
        const userMovies = await userMoviesService.getUserMovies({ userId });
        res.status(200).json({ ...userMovies, message: 'userMovies listed' });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/',
    scopesValidationHandler(['create:user-movies']),
    validationHandler(createUserMovieSchema),
    async function (req, res, next) {
      try {
        const userMovie = req.body;

        const createdUserMoviesId = await userMoviesService.addUserMovie({
          userMovie,
        });

        res
          .status(201)
          .json({ data: createdUserMoviesId, message: 'userMovies created' });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:userMovieId',
    scopesValidationHandler(['delete:user-movies']),
    validationHandler({ userMovieId: idSchema }, 'params'),
    async function (req, res, next) {
      const { userMovieId } = req.params;
      try {
        const deletedUserMovieId = await userMoviesService.deleteUserMovie({
          userMovieId,
        });
        res.status(200).json({
          data: deletedUserMovieId,
          result: 'userMovie deleted',
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = userMoviesApi;
