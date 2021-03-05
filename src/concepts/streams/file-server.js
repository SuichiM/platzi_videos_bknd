/** no optimizado, todo esto se labura en memoria*/
const fs = require("fs");

const server = require("http").createServer();
const PORT = process.env.PORT || 8080;

server.on("request", (req, res) => {
  fs.readFile("./big", (err, data) => {
    if (err) {
      console.log("error", err);
    }

    res.end(data);
  });
});

server.listen(PORT, function(err){
  if (err)
    console.error(err)
  else
    console.log(`listening on: http://localhost:${PORT}`)
});