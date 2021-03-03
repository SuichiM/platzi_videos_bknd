/**
 * duplex tiene la posiblidad de implementar
 * un writeable y readable stream a la vez
 * ya que podemos implementar ambas interfaces
 */

/**
 * Este ejemplo, agarra el standar input de la consola
 * y la vuelve a imprimir mediante el writableStream
 */

const { Duplex } = require("stream");

const duplexStream = new Duplex({
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  },
  read() {
    setTimeout(() => {
      if (this.currentCharCode > 90){
        this.push(null);
        return
      }  
      else this.push(String.fromCharCode(this.currentCharCode++));
    }, 500);
  },
});

/**
 * 1. process.stdin es un readableStream,
 * por eso podemos tiene implementado el metodo pipe
 */
duplexStream.currentCharCode = 65;

process.stdin.pipe(duplexStream).pipe(process.stdout);
