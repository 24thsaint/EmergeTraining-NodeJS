var routeModule  = require("./RoutingModule")
var consolidate = require("consolidate")
var route = routeModule()

route.get("/", function(request, response) {
    consolidate.swig("index.html", {}, function(err, html) {
        response.send(html)
    })
})
route.get("/time", function(request, response) {
    var date = new Date()
    response.writeHead(200, {"Content-Type" : "application/json"})
    var time = {currentTime : date}
    response.end(JSON.stringify(time))
})
route.get("/pretty-time", function(request, response) {
    var date = new Date()    
    consolidate.swig("pretty-time.html", { today: date.toLocaleString() }, function(err, html) {
        response.send(html)
    })
})
route.get("/test.txt", function(request, response) {
    response.writeHead(200, {"Content-Type" : "text/plain"})
    consolidate.swig("test.txt", {}, function(err, html) {
        response.end(html)
    })
})
route.get("/pretty-time-format", function(request, response) {
    var date = new Date()
    response.writeHead(200, {"Content-Type" : "text/plain"})
    response.end(date.toLocaleString())
})
route.listen(1234)
