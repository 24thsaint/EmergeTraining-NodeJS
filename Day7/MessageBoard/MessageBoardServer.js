var routingModule = require("./RoutingModule")
var mongoModule = require("./MongoModule")
var route = routingModule()
var mongo = mongoModule()
var consolidate = require("consolidate")
var fs = require("fs")
var url = require("url")
var sha1 = require("sha1")
var SALT = "fmasidfo7382quir;/@#ARWA#WRTA$Wmguwh89P8RH2;RINA3WLFPA498HTONGARDLZGKA"
var session = {} // session variable
var messageDatabase = {
    messages: []
}

function generateHash(raw) {
    return sha1(raw)
}

mongo.setDatabase('messageDatabase')

route.get("/chat", function(request, response) {
    var queryString = url.parse(request.url, true, true)

    if (session[queryString.query.id]) {
        consolidate.swig("public/messageboard.html", {name: session[queryString.query.id], accessToken: queryString.query.id}, function(err, html) {
            response.send(html)
        })
    } else {
        response.writeHead(403 ,{"Content-Type": "text/html"})
        response.end("<h1>FORBIDDEN.</h1>")
    }
})

route.post("/messages", function(request, response) {
    var message = ""
    request.on('data', function(data) {
        message += data
    })
    request.on('end', function() {
        var messageData = JSON.parse(message)
        if (session[messageData.accessToken] || session[messageData.accessToken] == messageData.user) {
            mongo.insert('messages', JSON.parse(message))
            response.writeHead(200, {"Content-Type" : "application/json"})
            mongo.find('messages', function(data) {
                response.end(JSON.stringify(data))
            })
        } else {
            response.writeHead(403 ,{"Content-Type": "text/html"})
            response.end("<h1>FORBIDDEN.</h1>")
        }

    })
})

route.get("/messages", function(request, response) {
    response.writeHead(200, {"Content-Type" : "application/json"})
    mongo.find('messages', function(data) {
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

// ===========================


route.get("/", function(request, response) {
    consolidate.swig("public/index.html", {}, function(err, html) {
        response.send(html)
    })
})

route.post("/login", function(request, response) {
    request.on('data', function(data) {
        var json = JSON.parse(data)
        mongo.findOne(json, 'users', function(err, data) {            
            if (data) {
                var rawText = new Date() + data.username + SALT
                var accessToken = generateHash(rawText)

                // store session
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
        var query = {username: json.username}
        mongo.findOne(query, 'users', function(err, data) {
            if (data) {
                mongo.insert('users', json)
                var json = {authResponse: true}
                response.writeHead(200, {"Content-Type" : "application/json"})
                response.end(JSON.stringify(json))
            } else {
                var json = {authResponse: false}
                response.writeHead(200, {"Content-Type" : "application/json"})
                response.end(JSON.stringify(json))
            }
        })
    })
})

route.get("/register", function(request, response) {
    consolidate.swig("public/register.html", {}, function(err, html) {
        response.send(html)
    })
})

route.get("/landing", function(request, response) {
    var queryString = url.parse(request.url, true, true)

    consolidate.swig("public/registration-landing.html", {status: queryString.query.status}, function(err, html) {
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

route.listen(1234)
