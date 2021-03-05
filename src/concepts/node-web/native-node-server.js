const http = require("http");
const server = http.createServer();

server.on("request", (req, res) => {
  console.log(req.method)
  console.log(req.url)

  if (req.method !== "POST" || req.url !== "/echo") {
    console.log('error')
    res.statusCode = 404;
    res.end();
    return;
  }

  let body = [];

  req
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      body = Buffer.concat(body).toString();
      res.end(body);
    });
});

server.listen(8080);
console.log("Servidor en la url http://localhost:8080");
