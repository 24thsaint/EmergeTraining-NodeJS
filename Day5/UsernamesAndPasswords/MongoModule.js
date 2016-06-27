var mongojs = require("mongojs")
var db = null
var collection = null

module.exports = function() {
    var components = {}
    components.setDatabase = function(dbname, collectionName) {
        db = mongojs(dbname)
        collection = collectionName
        console.log("Database name " + dbname + " is set")
    }
    components.findLatestNResults = function(n, callback) {
        console.log("Method find() is called!")

        db[collection].find({}).sort({$natural: -1}).limit(n, function (err, docs) {
            callback(docs.reverse())
        })

    }
    components.findOne = function(query, callback) {
        db[collection].findOne(query, function (err, docs) {
            callback(docs)
        })
    }
    components.insert = function(doc) {
        console.log(doc)
        db[collection].insert(doc)
    }
    return (components)
}
