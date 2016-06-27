var http = require("http")
var server = http.createServer(function(request, response){
    response.writeHead(200, {
        "Content-Type" : "text/html"
    })
    if (request.url == "/") {
        response.write("Hello World On HelloServer2.js!")
    } else if (request.url == "/hello") {
        response.write("localhost:8001/hello successfully acknowledged!")
    } else if (request.url == "/second") {
        response.write('<html><body><b>localhost:8001</b> successfully acknowledged. <br /> Go to <a href="/hello">localhost:8001/hello</a></body></html>')
    } else {
        response.write("ERROR 404: Page Not Found!")
    }
    response.end()
})
server.listen(8001)
console.log("SERVER RUNNING")
