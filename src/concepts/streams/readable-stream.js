const { Readable } = require("stream");

// 1. instanciamos nuestro readable
const readableStream = new Readable();

//2. empezamos a emitir datos
readableStream.push(`${0 / 0} !`.repeat(8).concat(" Batman, Batman.!"));

//3. decimos que termino, para ello hacemos un push con null
readableStream.push(null);

//4. asociamos nuestro readable stream a otro
// en este caso el std.out

readableStream.pipe(process.stdout);
