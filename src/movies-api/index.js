const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');

const { config } = require('./config/index');
const {
  logErrors,
  errorHandler,
  wrapErrors,
} = require('./middleware/errorHandler');
const notFoundHandler = require('./middleware/notFoundHandler');

/**
 *MIDDLEWARES
 */

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

app.use(helmet());

/**
 * SERVICES
 */
const moviesApi = require('./routes/movies');

app.get('/', (req, res) => {
  res.send({
    message: 'OK, up and running',
  });
});

moviesApi(app);

// catch 404 error
app.use(notFoundHandler);

/**
 * ERROR MIDDLEWARES
 *
 * this kind of middleware must always go at the end of routes
 * as the routes are middlewares too
 */

app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

/**
 * RUNNING THE SERVER
 */
app.listen(config.port, () => {
  console.log(`server listening on http://localhost:${config.port}`);
});
