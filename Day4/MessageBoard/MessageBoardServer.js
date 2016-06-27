var routingModule = require("./RoutingModule")
var mongoModule = require("./MongoModule")
var route = routingModule()
var mongo = mongoModule()
var consolidate = require("consolidate")
var fs = require("fs")

var messageDatabase = {
    messages: []
}

mongo.setDatabase('messageDatabase', 'messages')

route.get("/", function(request, response) {
    consolidate.swig("public/index.html", {name: jsonName}, function(err, html) {
        response.send(html)
    })
})

route.post("/messages", function(request, response) {
    var message = ""
    request.on('data', function(data) {
        message += data
    })
    request.on('end', function() {
        mongo.insert(JSON.parse(message))
        response.writeHead(200, {"Content-Type" : "application/json"})
        mongo.find(function(data) {
            response.end(JSON.stringify(data))
        })
    })
})

route.get("/messages", function(request, response) {
    response.writeHead(200, {"Content-Type" : "application/json"})
    mongo.find(function(data) {
        response.end(JSON.stringify(data))
    })
})

route.get("/ajax.js", function(request, response) {
    fs.readFile("public/ajax.js", function(err, data) {
        response.writeHead(200, {"Content-Type" : "text/javascript"})
        response.end(data)
    })
})

route.get("/style.css", function(request, response) {
    fs.readFile("public/style.css", function(err, data) {
        response.writeHead(200, {"Content-Type" : "text/css"})
        response.end(data)
    })
})

route.listen(1234)
