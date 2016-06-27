var http = require('http')
var StaticServer = require('node-static').Server
var file = new StaticServer('./public')
var server = http.createServer(function(request, response) {
    file.serve(request, response)
})
server.listen(8000)
console.log("SERVER RUNNING");
