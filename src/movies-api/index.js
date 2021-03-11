const express = require('express');
const app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies')

app.use(express.json())

app.get('/', (req, res) => {
  res.send({
    message: 'OK, up and running'
  });
});

moviesApi(app)

app.listen(config.port, () => {
  console.log(`server listening on http://localhost:${config.port}`);
});
