const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

const ApiKeyService = require('../services/apiKeys');

const { config } = require('../config');

// Basic Strategy
require('../utils/auth/strategies/basic');

function authApi(app) {
  const router = express.Router();
  app.use('/api/auth', router);

  apiKeyService = new ApiKeyService();

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
}

module.exports = authApi;
