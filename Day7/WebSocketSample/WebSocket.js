var http = require('http')
var WebSocketServer = require('websocket').server
var StaticServer = require('node-static').Server

var file = new StaticServer('./public')

var server = http.createServer(function(request, response) {
    file.serve(request, response)
})

var wss = new WebSocketServer({httpServer : server})
console.log(wss);
wss.on('request', function(request) {
    var connection = request.accept()
    console.log("Received a connection");
    connection.on('message', function(message) {
        console.log('Received: ' + message.utf8Data);
        connection.sendUTF(message.utf8Data)
    })
    connection.on('close', function(reasonCode, description) {
        console.log('Connection closed');
    })
})

server.listen(1234)

console.log("SERVER RUNNING");
