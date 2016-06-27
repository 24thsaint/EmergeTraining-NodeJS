var routingModule = require("./RoutingModule")
var route = routingModule()
var https = require("https")

var facebookModule = require("./FacebookModule")
var facebook = facebookModule()

route.get("/", function (request, response) {
    facebook.setFacebookAccessParams("/v2.6/me/friends", 'xxxx')
    facebook.getResponse(function(friendList) {
        var friends = friendList.data
        var body = ""
        friends.forEach(function(friend) {
            body += "<a href='http://www.facebook.com/" + friend.id + "'>"+ friend.name +"</a><br />"
        })
        response.send(body)
    })
})

route.listen(1234)
