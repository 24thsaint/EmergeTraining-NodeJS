var http = require('http')
var url = require('url')
var fs = require('fs')

module.exports = function() {
    var v = {}
    v.posthandlers = {}
    v.gethandlers = {}

    v["POST"] = v.posthandlers
    v["GET"] = v.gethandlers

    v.get = function(path, handler) {
        v.gethandlers[path] = handler
    }
    v.post = function(path, handler) {
        v.posthandlers[path] = handler
    }

    v.listen = function(port) {
        server = http.createServer(function(request, response) {
            console.log(request.url);
            console.log(request.method);

            response.send = function(text) {
                response.writeHead(200, {"Content-Type" : "text/html"})
                response.end(text)
            }

            // parse only pathname, this eliminates extra control-flow
            // statements so that it can handle get requests
            // with querystrings automagically
            var pathnameParser = url.parse(request.url, false, true)

            var handler = v[request.method][pathnameParser.pathname]

            if (handler) {
                handler(request, response)
            } else {
                if (request.url.includes(".css")) {
                    response.writeHead(200, {"Content-Type" : "text/style"})
                } else {
                    response.writeHead(200, {"Content-Type" : "text/javascript"})
                }

                fs.readFile("request.url", function(err, data) {
                    console.log(err);
                    console.log(data);
                    if (!err) {
                        response.end(data)
                    } else {
                        response.send("Error 404: PAGE NOT FOUND")
                    }
                })
            }

        }).listen(port)
    }

    console.log("SERVER STARTED");
    return(v)
}
