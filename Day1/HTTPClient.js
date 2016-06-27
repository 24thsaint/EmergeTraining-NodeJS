var http = require("http")

// var options = {
//     host: "www.google.com",
//     port: "80",
//     path: "/"
// }

var options = {
    host: "www.restcountries.eu",
    path: "/rest/v1/all"
}

var callBack = function(response) {
    // this is how to get the headers
    // console.log("HEADERS: " + JSON.stringify(response.headers, null, '\t'))

    // this is how to get contents
    // response.on('data', function(chunk) {
    //     console.log(chunk.toString() + "\n")
    // })

    var concat = ""
    response.on('data', function(chunk) {
        concat += chunk
    })
    response.on('end', function() {
        console.log(JSON.parse(concat));
    })

}

var request = http.request(options, callBack)
request.end()
