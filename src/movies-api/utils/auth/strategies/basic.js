const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const UserService = require('../../../services/users');

passport.use(
  new BasicStrategy(async function (email, pass, cb) {
    const userService = new UserService();

    try {
      const user = await userService.getUser({ email });
      if (!user) return cb(boom.unauthorized(), false);

      if (!(await bcrypt.compare(pass, user.password)))
        return cb(boom.unauthorized(), false);

      delete user.password;

      return cb(false, user);
    } catch (error) {
      cb(error);
    }
  })
);
