var twitter = require('twitter')
var tweet = new twitter({
    consumer_key: '6NClUhtZfMglBZnpq3wkZQB75',
    consumer_secret: 'qQ9aZBZewOm1ELvWmmrLeqL1JOaqp1rLnQ9lZRvxzavfbx5a9U',
    access_token_key: '42007871-n1mjk1pD9AgjCyTQeFZMUOJL66PCCqmupFiRG8VV5',
    access_token_secret: 'KgnWmfQzZlMg6EI9XAD3R9ZVJ9zFYLH2dfLvMIFuNGrdG'
})

var cb = function(error, tweets, response) {
    console.log(tweets)
}

tweet.get("/statuses/home_timeline.json", {}, cb)
