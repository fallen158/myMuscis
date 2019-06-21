const fs = require('fs')

console.log(1)

fs.readFile('./lyric.text',(err,data)=>{
  console.log(JSON.parse(data).name)
})