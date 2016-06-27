var http = require("http")

var quoteModule = require('./QuoteModule')
var quotes = quoteModule.getData

var serverDefinition = function (request, response) {

    response.writeHead(200, {"Content-Type" : "text/html"})

    var functions = {}
    var body = ""

    function quoteIterator(quoteCategory) {
        functions["/quotes/" + quoteCategory] = function() {
            for (var quote in quotes[quoteCategory]) {
                body += quoteModule.quoteWrapper(quotes[quoteCategory][quote].text, quotes[quoteCategory][quote].reference)
            }
        }
    }
    quoteModule.allCategoriesParser().forEach(quoteIterator)

    functions[""] = function() {
        body += "<a href='/categories'>Categories</a><br />"
        body += "<a href='/random'>Random Quote</a><br />"
        body += "<a href='/quotes'>Show All Quotes</a>"
    }
    functions["/categories"] = function() {
        function categoryIterator(data) {
            body += "<a href='/quotes/" + data + "'>"+ data +"</a><br />"
        }
        quoteModule.allCategoriesParser().forEach(categoryIterator)

    }
    functions["/quotes"] = function() {

        for (var category in quotes) {
            for (var quote in quotes[category]) {
                body += quoteModule.quoteWrapper(quotes[category][quote].text, quotes[category][quote].reference)
            }
        }

    }

    functions["/random"] = function() {
        var randomCategoryNumber = Math.floor(Math.random() * Object.keys(quotes).length) + 1
        var randomCategory = Object.keys(quotes)[randomCategoryNumber - 1]
        var category = quotes[randomCategory]

        var randomQuoteNumber = Math.floor(Math.random() * category.length) + 1
        var randomQuote = category[randomQuoteNumber - 1]

        body += quoteModule.quoteWrapper(randomQuote.text, randomQuote.reference)


    }

    var url = request.url

    if (url.endsWith("/")) {
        url = url.substr(0, url.length - 1)
    }

    if (typeof functions[url] == 'function') {
        functions[url]()
    } else {
        body += "ERROR 404 : PAGE NOT FOUND <button class='btn btn-default'>hi</button>"
    }

    response.write(body)
    response.end()
}
var server = http.createServer(serverDefinition)
server.listen(3000)
// server.listen(80)
// process.setuid(1000)
// process.setgid(1000)
console.log("SERVER RUNNING");
