const fs = require('fs');
const path = require('path')

const fileName = process.argv[2];

if(!fileName)
  return console.error('you must specify the filename')

const fullPath = path.join(__dirname, fileName);

fs.readFile(fullPath, (err, content)=>{
  if(err)
    return console.error(err)

  const lineNumber = content.toString().split('\n').length
  console.log(`the file has ${lineNumber} lines`)
})