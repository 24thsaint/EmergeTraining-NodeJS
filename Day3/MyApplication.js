var http = require('http')

var serverDefinition = function(request, response) {
    response.writeHead(200, {"Content-Type" : "text/html"})

    var functions = {}      //associative array

    var url = request.url

    functions["/"] = function() {
        response.write("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
        response.write("<a href='/x'><button type='button'>Click Me</button>")
    }

    functions["/x"] = function() {
        response.write("<h1>THANK YOU</h1>")
    }

    if (typeof functions[url] == 'function' ) {
        functions[url]()
    } else {
        response.write("ERROR 404: Page Not Found")
    }

    response.end()
}

var server = http.createServer(serverDefinition)
server.listen(8000)
console.log("SERVER STARTED");
