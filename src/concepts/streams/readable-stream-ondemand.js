const { Readable } = require("stream");

// 1. instanciamos nuestro readable
const readableStream = new Readable({
  read(size) {
    setTimeout(() => {
      if (this.currentChartCode > 90) this.push(null);
      else this.push(String.fromCharCode(this.currentChartCode++));
    }, 500);
  },
});

readableStream.currentChartCode = 65;

readableStream.pipe(process.stdout);
