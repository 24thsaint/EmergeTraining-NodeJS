var routingModule = require("./RoutingModule")
var route = routingModule()
var https = require("https")

var facebookModule = require("./FacebookModule")
var facebook = facebookModule()

var friendListData = null

facebook.setFacebookAccessParams("/v2.6/me/friends", 'xxxx')
facebook.getResponse(function(friendList) {
    friendListData = friendList
})

route.get("/", function(request, response) {
    console.log(friendListData);

    if (friendListData) {
        var friends = friendListData.data
        var body = ""
        friends.forEach(function(friend) {
            body += "<a href='http://www.facebook.com/" + friend.id + "'>"+ friend.name +"</a><br />"
        })
        response.send(body)
    } else {
        response.send("DOWNLOADING FRIEND LIST... Please wait...")
    }
})

route.listen(1234)
