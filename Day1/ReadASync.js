var fs = require('fs')
console.log("1")
fs.readFile('file.txt', function (err, data){
    console.log("2")
    console.log(data)
    console.log("3")
})
console.log("4")
