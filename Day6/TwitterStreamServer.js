var routingModule = require("./RoutingModule")
var route = routingModule()
var consolidate  = require("consolidate")

var twitter = require('twitter')
var tweet = new twitter({
    consumer_key: 'xxxx',
    consumer_secret: 'xxxx',
    access_token_key: 'xxxx',
    access_token_secret: 'xxxx'
})

route.get("/", function(request, response) {
    response.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"})
    var cb = function(stream) {
        stream.on('data', function(data) {
            response.write("<b>"+data.user.name + "</b>: " + data.text + "<br />")
        })
    }

    tweet.stream("/statuses/filter", { track : "I LOVE YOU" }, cb)
})

route.listen(1234)
