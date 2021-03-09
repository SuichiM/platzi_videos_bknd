const fs = require('fs');
const path = require('path')


const out = fs.createWriteStream(path.join(__dirname, 'out.log')); 
const err = fs.createWriteStream(path.join(__dirname, 'err.log'));

const customConsole = new console.Console(out, err);


setInterval(() => {
  customConsole.log(new Date())
  customConsole.error(new Error('Ooops! man'))
}, 2000);