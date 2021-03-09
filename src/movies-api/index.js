const express = require('express');
const app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies');
const moviesRoutes = require('./routes/movies')

app.get('/', (req, res) => {
  res.send({
    message: 'OK, up and running'
  });
});

moviesRoutes(app)

app.listen(config.port, () => {
  console.log(`server listening on http://localhost:${config.port}`);
});
