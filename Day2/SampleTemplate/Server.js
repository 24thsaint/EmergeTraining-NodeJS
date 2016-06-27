var http = require('http')
var cons = require('consolidate')

var serverDefinition = function(request, response) {
    cons.swig("views/index.html", {name: "Jones, Marvel"},
        function(err, html) {
            response.writeHead(200, {"Content-Type" : "text/html"})
            response.end(html)
        }
    )
}
var server = http.createServer(serverDefinition)
server.listen(3000)
console.log("SERVER RUNNING");
