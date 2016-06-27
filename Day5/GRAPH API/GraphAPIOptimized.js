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

var intervalCounter = 60
var canRefresh = false

setInterval(function() {
    if (intervalCounter == 0) {
        intervalCounter = 61
        canRefresh = true
    }
    intervalCounter--;
}, 1000)

route.get("/", function(request, response) {
    console.log(canRefresh)

    if (canRefresh) {
        facebook.getResponse(function(friendList) {
            friendListData = friendList
            console.log("Friend List updated successfully!");
        })
        canRefresh = false
        counter = 60
    }

    if (friendListData) {
        var friends = friendListData.data
        var body = ""
        friends.forEach(function(friend) {
            body += "<a href='http://www.facebook.com/" + friend.id + "'>"+ friend.name +"</a><br />"
        })
        response.send(body)
    } else {
        response.send("Fetching your friend list...")
    }
})

route.listen(1234)
