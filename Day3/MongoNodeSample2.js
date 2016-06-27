var mongojs = require("mongojs")
var dbname = "names"
var db = mongojs(dbname)
var http = require("http")

http.createServer(function(request, response) {
    if (request.url == "/vals") {
        db.names.find(function(err, docs) {
            response.writeHead(200, {"Content-Type" : "application/json"})
            response.end(JSON.stringify(docs))
        })
    } else {
        response.writeHead(404, {"Content-Type": "text/plain"})
        response.end("Error 404 : PAGE NOT FOUND")
    }
}).listen(8001)
