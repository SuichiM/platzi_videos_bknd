const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('@hapi/boom');

const UserService = require('../../../services/users');
const { config } = require('../../../config');

passport.use(
  new Strategy(
    {
      secretOrKey: config.auth_jwt_secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async function (tokenPayload, cb) {
      const userService = new UserService();

      try {
        const user = userService.getUser({ user: tokenPayload.email });
        if (!user) return cb(boom.unauthorized(), false);

        delete user.password;

        return cb(false, { ...user, scopes: tokenPayload.scopes });
      } catch (error) {
        cb(boom.unauthorized(), false);
      }
    }
  )
);
