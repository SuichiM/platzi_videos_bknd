const express = require('express');
const app = express();

const { config } = require('./config/index');

const { logErrors, errorHandler } = require('./middleware/errorHandler');

/**
 *MIDDLEWARES
 */
app.use(express.json());

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

/**
 * ERROR MIDDLEWARES
 * 
 * this kind of middleware must always go at the end of routes
 * as the routes are middlewares too
 */

app.use(logErrors);
app.use(errorHandler);
 

/**
 * RUNNING THE SERVER
 */
app.listen(config.port, () => {
  console.log(`server listening on http://localhost:${config.port}`);
});
