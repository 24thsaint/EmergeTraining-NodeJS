var https = require("https")

var options = {
    hostname: 'graph.facebook.com',
    port: 443,
    path: '/v2.6/me/friends?access_token=xxxx',
    method: 'GET',
}

var request = https.request(options, function(data) {
    var body = ""
    data.on('data', function(data) {
        body += data
    })
    data.on('end', function() {
        var pretty = JSON.parse(body, null, "\t")
        var data = pretty.data
        data.forEach(function(friend) {
            console.log(friend.name);
        })
    })
})
request.end()
