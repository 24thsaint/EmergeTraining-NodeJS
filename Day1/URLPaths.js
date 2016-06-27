var http = require("http")
const url = require('url')

var serverDefinition = function (request, response) {
    console.log(request.method)
    console.log(request.url)
    console.log(request.headers)

    response.writeHead(
        200, {"Content-Type" : "text/html"}
    )

    var data = {}

    var port = request.headers.host.split(":")[1] // caters to localhost:port or 127.0.0.1:port hosts

    if (port == "8005") {
        data = {
            character: "Aang",
            superpowers: [
                "Fire",
                "Water",
                "Earth",
                "Wind",
                "Air"
            ],
            specialty: "Air"
        }
    } else {
        data = {
            character: "Harry Potter",
            superpowers: [
                "Wingardium Leviosa",
                "Expecto Patronum",
                "Confringo",
                "Expelliarmus",
                "Crucio"
            ],
            specialty: "Expecto Patronum"
        }
    }

    switch (request.url) {
        case "/": {
            response.write(JSON.stringify(data))
            break
        }
        case "/character": {
            response.write(JSON.stringify(data.character))
            break
        }
        case "/superpowers": {
            response.write(JSON.stringify(data.superpowers))
            break
        }
        case "/superpowers/cast": {
            function releasePowers() {
                var random = Math.floor(Math.random() * 5) + 1
                var superPower = JSON.stringify(data.superpowers[random - 1])
                var responseHTML = "<b>" + data.character + "</b> attacks the enemy. <b>" + superPower + "</b> bending technique activate!!! <br />"
                if (superPower == JSON.stringify(data.specialty)) {
                    responseHTML += "<p style='color: red'>THE ENEMY RECEIVED A CRITICAL HIT!</p>"
                }
                response.write(responseHTML)
                releasePowers() // intentional recursion to demonstrate outputs
            }
            releasePowers()
            break
        }
        default: {
            response.write("ERROR 404: Page Not Found")
        }
    }
    response.end()
}

var server1 = http.createServer(serverDefinition)
server1.listen(8005)
var server2 = http.createServer(serverDefinition)
server2.listen(8006)
console.log("SERVER RUNNING")
