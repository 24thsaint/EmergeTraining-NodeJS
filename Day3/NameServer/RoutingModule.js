var http = require('http')

module.exports = function() {
    var v = {}
    v.posthandlers = {}
    v.gethandlers = {}

    v.get = function(path, handler) {
        v.gethandlers[path] = handler
    }
    v.post = function(path, handler) {
        v.posthandlers[path] = handler
    }

    v.listen = function(port) {
        server = http.createServer(function(request, response) {
            response.send = function(text) {
                response.writeHead(200, {"Content-Type" : "text/html"})
                response.end(text)
            }

            var handler = v.gethandlers[request.url]

            if (request.method == "POST") {
                handler = v.posthandlers[request.url]
            }

            if (handler) {
                handler(request, response)
            } else {
                response.send("Error 404: PAGE NOT FOUND")
            }
            
        }).listen(port)
    }

    console.log("SERVER STARTED");
    return(v)
}
