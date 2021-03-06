/**
 * Este ejemplo, agarra el standar input de la consola
 * y la vuelve a imprimir mediante el writableStream
 */

const { Writable } = require("stream");


const writableStream = new Writable({
  write(chunk, encoding, callback) {
    let inMsg= chunk.toString()
    console.log(`echo: ${inMsg} ${inMsg} ${inMsg}...`);
    callback();
  }
});

/**
 * 1. process.stdin es un readableStream, 
 * por eso podemos tiene implementado el metodo pipe  
 */
process.stdin.pipe(writableStream);


/* 
este ejemplo del writer stream agarra el stdin 
y lo imprime en upper case

const writeStreamToUpper = new Writable({
  write(chunk, encoding, cb){
    console.log(chunk.toString().toUpperCase())
    cb()
  }
})


process.stdin.pipe(writableStream);
*/