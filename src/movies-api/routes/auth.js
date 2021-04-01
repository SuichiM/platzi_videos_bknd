const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

// services
const ApiKeyService = require('../services/apiKeys');
const UserService = require('../services/users');

// config
const { config } = require('../config');

// schemas
const { createUserSchema } = require('../schemas/user');

//midlleware
const validationHandler = require('../middleware/validationHandler');

// Basic Strategy
require('../utils/auth/strategies/basic');

function authApi(app) {
  const router = express.Router();
  app.use('/api/auth', router);

  const apiKeyService = new ApiKeyService();
  const userService = new UserService();

  router.post('/sign-in', async function (req, res, next) {
    const { apiKeyToken } = req.body;

    if (!apiKeyToken) next(boom.unauthorized('apiKeyToken is required'));

    passport.authenticate('basic', function (error, user) {
      try {
        if (error || !user) return next(boom.unauthorized());

        req.login(user, { session: false }, async function (err) {
          if (err) return next(err);
          const apiKey = await apiKeyService.get({ token: apiKeyToken });

          if (!apiKey) return next(boom.unauthorized());

          const { _id: id, name, email } = user;

          const payload = {
            sub: id,
            name,
            email,
            scopes: apiKey.scopes,
          };

          const token = jwt.sign(payload, config.auth_jwt_secret, {
            expiresIn: '15m',
          });

          return res.status(200).json({ token, user: { id, name, email } });
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  router.post(
    '/sign-up',
    validationHandler(createUserSchema),
    async function (req, res, next) {
      const { body: user } = req;

      try {
        const createdUserId = await userService.createUser(user);
        res.status(201).json({
          data: createdUserId,
          message: 'user created',
        });
      } catch (error) {
        next(boom.badImplementation());
      }
    }
  );
}

module.exports = authApi;
