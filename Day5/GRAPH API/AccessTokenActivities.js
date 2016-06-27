var routingModule = require("./RoutingModule")
var route = routingModule()
var consolidate = require("consolidate")
var facebookModule = require("./FacebookModule")
var facebook = facebookModule()

route.get("/", function(request, response) {
    consolidate.swig("public/index.html", {}, function(err, html) {
        response.send(html)
    })
})

route.get("/code", function(request, response) {
    var code = request.url.split("?code=")[1]

    facebook.getAccessToken('xxxx', 'http://localhost:1234/', 'xxxx', code, function(data) {
        var parsedData = data.split("&")[0]
        var accessToken = parsedData.split("=")[1]

        facebook.requestData(accessToken, '/v2.6/me', function(data) {
            response.end(data)
        })
    })
})

route.listen(1234)
