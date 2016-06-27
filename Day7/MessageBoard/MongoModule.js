var mongojs = require("mongojs")
var db = null

module.exports = function() {
    var components = {}
    components.setDatabase = function(dbname) {
        db = mongojs(dbname)
        console.log("Database name " + dbname + " is set")
    }

    components.find = function(collection, callback) {

        db[collection].find({}).sort({$natural: -1}).limit(20, function (err, docs) {
            callback(docs.reverse())
        })

    }

    components.findOne = function(query, collection, callback) {
        db[collection].findOne(query, function (err, docs) {
            callback(err, docs)
        })
    }

    components.insert = function(collection, doc) {
        console.log(doc)
        db[collection].insert(doc)
    }
    return (components)
}
