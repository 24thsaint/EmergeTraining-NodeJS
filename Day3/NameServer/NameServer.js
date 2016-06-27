var routingModule = require("./RoutingModule")
var mongoModule = require("./MongoModule")
var cons = require("consolidate")

var router = routingModule()
var mongo = mongoModule()

mongo.setDatabase('names', 'names')

function postParser(postString) {
    var document = {}
    var individualItems = postString.split("&")
    individualItems.forEach(function (data) {
        var keyValuePairs = data.split("=")
        document[keyValuePairs[0]] = keyValuePairs[1].split("+").join(" ")
    })
    return document
}

router.post("/names/pretty", function(request, response) {
    request.on('data', function(dataStream) {
        var data = ""
        data += dataStream
        mongo.insert(postParser(data))
    })
    response.send("<h1>AGENT HAS BEEN ADDED TO THE DATABASE!</h1> <a href='/names/pretty'>BACK</a>")
})

router.get("/names", function(request, response) {
    mongo.find(function(data) {
        response.send(JSON.stringify(data))
    })
})

router.get("/names/pretty", function (request, response) {
    mongo.find(function(data) {
        console.log(data);
        cons.swig("views/index.html", {data: data},
            function(err, html) {
                response.writeHead(200, {"Content-Type" : "text/html"})
                response.end(html)
            }
        )
    })
})

router.listen(8001)
