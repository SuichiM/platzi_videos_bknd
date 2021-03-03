/** el stream server, al usar el readstream no hace explotar la memoria al procesar*/

const fs = require("fs");

const server = require("http").createServer();
const PORT = process.env.PORT || 8080;

server.on("request", (req, res) => {
  const src = fs.createReadStream('./big');
  src.pipe(res);
});

server.listen(PORT, function(err){
  if (err)
    console.error(err)
  else
    console.log(`listening on: http://localhost:${PORT}`)
});