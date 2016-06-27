var https = require("https")

var options = null

module.exports = function() {
    var functions = {}

    functions.setFacebookAccessParams = function(path, accessToken) {
        var object = {
            hostname: 'graph.facebook.com',
            port: 443,
            path: path + '?limit=5000&access_token=' + accessToken,
            method: 'GET',
        }
        options = object
    }

    functions.getResponse = function(callback) {
        var facebookRequest = https.request(options, function(data) {
            var dataConcat = ""
            data.on('data', function(data) {
                dataConcat += data
            })
            data.on('end', function() {
                callback(JSON.parse(dataConcat))
            })
        })
        facebookRequest.end()
    }

    functions.getAccessToken = function(clientID, uri, secret, code, callback) {

        var object = {
            hostname: "graph.facebook.com",
            port: 443,
            path: '/oauth/access_token?client_id='+clientID+'&redirect_uri='+uri+'&client_secret='+secret+'&code='+code,
            method: 'GET',
        }

        var facebookRequest = https.request(object, function(data) {
            var dataConcat = ""
            data.on('data', function(data) {
                dataConcat += data
            })
            data.on('end', function() {
                callback(dataConcat)
            })
        })
        facebookRequest.end()
    }

    functions.requestData = function(accessToken, path, callback) {
        var object = {
            hostname: "graph.facebook.com",
            port: 443,
            path: path + '?access_token=' + accessToken,
            method: 'GET',
        }

        var facebookRequest = https.request(object, function(data) {
            var dataConcat = ""
            data.on('data', function(data) {
                dataConcat += data
            })
            data.on('end', function() {
                callback(dataConcat)
            })
        })
        facebookRequest.end()
    }
    return (functions)
}
