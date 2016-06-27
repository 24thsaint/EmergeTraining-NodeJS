var net = require('net')
var clients = []
var database = []
var name = null
var server = net.createServer(function(socket) {
    console.log('CLIENT CONNECTED')

    clients.push(socket)
    name = socket.hostname

    socket.on('data', function (data) {

        var d = data.toString()
        var message = name + " says: " + d
        database.push(message)

        for (var client in clients) {
            clients[client].write(message)
        }

        socket.write("ENTER YOUR MESSAGE: ")
    })

    socket.on('end', function() {
        console.log('CLIENT DISCONNECTED')
    })

    socket.on('error', function (err) {
        throw err
    })
})

server.listen(8124, function() {
    console.log('SERVER IS UP')
})
