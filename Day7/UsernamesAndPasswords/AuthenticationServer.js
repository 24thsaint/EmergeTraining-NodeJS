var mongoModule = require("./MongoModule")
var routingModule = require("./RoutingModule")
var consolidate = require("consolidate")
var fs = require("fs")
var sha1 = require("sha1")
var mongo = mongoModule()
var route = routingModule()
var SALT = "faWESFK#@RW#$QYwertgo3q40kogERTG%$W)&($*)asdf!@#E!(@EDAW$^)"

function generateHash(raw) {
    return sha1(raw)
}

var session = {}

mongo.setDatabase("app", "users")

route.get("/", function(request, response) {
    consolidate.swig("public/index.html", {}, function(err, html) {
        response.send(html)
    })
})

route.post("/login", function(request, response) {
    response.writeHead(200, {"Content-Type" : "application/json"})
    request.on('data', function(data) {
        var json = JSON.parse(data)
        mongo.findOne(json, function(data) {
            console.log(data);
            if (data) {
                var rawText = new Date() + data.username + SALT
                var accessToken = generateHash(rawText)
                session[accessToken] = data.username
                var res = {username: data.username, authResponse: true, accessToken: accessToken}
                response.end(JSON.stringify(res))
            } else {
                var res = {authResponse: false}
                response.end(JSON.stringify(res))
            }
        })
    })
})

route.post("/register", function(request, response) {
    request.on('data', function(data) {
        var json = JSON.parse(data)
        mongo.insert(json)
    })
    var json = {authResponse: true}
    response.writeHead(200, {"Content-Type" : "application/json"})
    response.end(JSON.stringify(json))
})

route.get("/register", function(request, response) {
    consolidate.swig("public/register.html", {}, function(err, html) {
        response.send(html)
    })
})

route.get("/login.js", function(request, response) {
    response.writeHead(200, {"Content-Type" : "text/javascript"})
    fs.readFile("public/login.js", function(err, data) {
        response.end(data)
    })
})

route.get("/registration.js", function(request, response) {
    response.writeHead(200, {"Content-Type" : "text/javascript"})
    fs.readFile("public/registration.js", function(err, data) {
        response.end(data)
    })
})

route.get("/style.css", function(request, response) {
    response.writeHead(200, {"Content-Type" : "text/css"})
    fs.readFile("public/style.css", function(err, data) {
        response.end(data)
    })
})

route.get("/favicon.ico", function(request, response) {
    response.end() //do nothing?
})

console.log("SERVER RUNNING");
route.listen(1234)
