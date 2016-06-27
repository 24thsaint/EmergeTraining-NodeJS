var http = require("http")
var server = http.createServer(function(request, response) {
    console.log(request.url);
    console.log(request.method);
    if (request.url == "/postoffice") {
        if (request.method == "POST") {
            var body = ""
            request.on('data', function(data) {
                body = data.toString()
                console.log(body);
            })            
            request.on('end', function() {
                response.writeHead(200, {"Content-Type" : "text/plain"})
            })
            console.log(body);
            response.write(body)
            response.end()
        } else {
            response.writeHead(200, {"Content-Type" : "text/plain"})
            response.write("YOUR REQUEST CANNOT BE HANDLED BY THE POST OFFICE, please try other mail carriers.")
            response.end()
        }
    } else {
        response.writeHead(404, {"Content-Type" : "text/plain"})
        response.end("Page Not Found")
    }
})
server.listen(3000)
console.log("SERVER RUNNING");


// class Product {
//     // something here
// }
//
// class Item {
//
// }
//
// class Order {
//     private String userID;
// }
//
// class Cart {
//     private Order[] orders;
// }
