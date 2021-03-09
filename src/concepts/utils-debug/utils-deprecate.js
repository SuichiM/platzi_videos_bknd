const util = require('util')

const helloPluto = util.deprecate(()=>{
  console.log('hello pluto')
}, 'pluto is not a planet anymore')

helloPluto()