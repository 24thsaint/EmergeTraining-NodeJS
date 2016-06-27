var routingModule = require('./RoutingModule')
var consolidate = require('consolidate')
var route = routingModule()
var fs = require('fs')

route.get("/", function(request, response) {
    consolidate.swig("RegistrationForm.html", {}, function(err, html) {
        response.send(html)
    })
})

route.post("/people", function(request, response) {
    var body = ''
    request.on('data', function(data) {
        body += data.toString()
    })
    request.on('end', function() {
        response.writeHead(200, {"Content-Type" : "text/plain"})
        let json = JSON.parse(body)
        response.end(JSON.stringify(json))
    })
})

route.get("/AJAXPost.js", function(request, response) {
    response.writeHead(200, {"Content-Type": "text/javascript"})
    fs.readFile("AJAXPost.js", function(err, data) {
        response.end(data)
    })
})

route.get("/semantic.css", function(request, response) {
    response.writeHead(200, {"Content-Type": "text/css"})
    fs.readFile("semantic.css", function(err, data) {
        response.end(data)
    })
})

route.listen(1234)
