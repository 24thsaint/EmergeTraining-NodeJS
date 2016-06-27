var http = require("http")
var server = http.createServer(function (request, response){
    response.writeHead(200, {
        "Content-Type" : "text/plain"
    })
    response.write("Hello World On HelloServer.js!\n")
    response.end()
})
server.listen(8001)
console.log("Server running")
