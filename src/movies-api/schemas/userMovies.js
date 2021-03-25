const joi = require('@hapi/joi');

const { movieIdSchema } = require('./movies');
const { idSchema: userIdSchema } = require('./user');

const idSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createUserMovieSchema = {
  userId: userIdSchema,
  movieId: movieIdSchema,
};

module.exports = {
  idSchema,
  createUserMovieSchema,
};
