var routingModule = require("./RoutingModule")
var route = routingModule()
var url = require('url')
var consolidate  = require("consolidate")
var twitter = require('twitter')
var OAuth= require('oauth').OAuth
var oauthTokenSecret = null
var oa = new OAuth(
    "https://api.twitter.com/oauth/request_token",
    "https://api.twitter.com/oauth/access_token",
    "xxxx",
    "xxxx",
    "1.0",
    "http://localhost:1234/auth/twitter/callback",
    "HMAC-SHA1"
)
var tweetPub = null
var fs = require('fs')

route.get("/", function(request, response) {
    consolidate.swig("public/index.html", {}, function(err, html) {
        response.send(html)
    })
})

route.get('/auth/twitter', function(request, response){
    oa.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results){
        if (error) {
            console.log(error)
            response.send("THERE SEEMS TO BE AN ERROR. We are fixing this as soon as possible.")
        }
        else {
            oauthTokenSecret = oauthTokenSecret
            console.log("It works!")
            response.writeHead(302,
                {Location: 'https://twitter.com/oauth/authenticate?oauth_token='+oauthToken}
            )
            response.end()
        }
    })
})

route.get("/auth/twitter/callback", function(request, response) {

    // use the library to parse querystrings via var.query.putTheQueryStringHere
    var urlParser = url.parse(request.url, true, true)

    var oauthToken = urlParser.query.oauth_token
    var oauthVerifier = urlParser.query.oauth_verifier

    oa.getOAuthAccessToken(oauthToken, oauthTokenSecret, oauthVerifier,
        function(error, oauthAccessToken, oauthAccessTokenSecret, results){
            if (error){
                console.log(error)
                response.send("THERE SEEMS TO BE AN ERROR. We are fixing this as soon as possible.")
            } else {

                var tweet = new twitter({
                    consumer_key: '6NClUhtZfMglBZnpq3wkZQB75',
                    consumer_secret: 'qQ9aZBZewOm1ELvWmmrLeqL1JOaqp1rLnQ9lZRvxzavfbx5a9U',
                    access_token_key: oauthAccessToken,
                    access_token_secret: oauthAccessTokenSecret
                })

                tweetPub = tweet

                var cb = function(error, tweets, res) {
                    consolidate.swig("public/tweets.html", {profile: results, tweets: tweets}, function(err, html) {
                        response.end(html)
                    })
                }

                tweet.get("/statuses/home_timeline.json", {}, cb)
            }
        }
    )
})

route.get("/tweet/single", function(request, response) {
    var queryString = url.parse(request.url, true, true)

    var cb = function(error, singleTweet, res) {
        console.log(singleTweet);

        consolidate.swig("public/single.html", {tweet: singleTweet}, function(err, html) {
            response.end(html)
            console.log(err);
        })
    }
    tweetPub.get("https://api.twitter.com/1.1/statuses/show.json?id=" + queryString.query.tweet_id, {}, cb)
})

route.get("/style.css", function(request, response) {
    response.writeHead(200, {"Content-Type" : "text/css"})
    fs.readFile("public/style.css", function(err, data) {
        response.end(data)
    })
})

route.listen(1234)
