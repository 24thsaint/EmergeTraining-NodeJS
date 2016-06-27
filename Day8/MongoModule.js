var mongojs = require("mongojs")
var db = null

module.exports = function() {
    var components = {}
    components.setDatabase = function(dbname) {
        db = mongojs(dbname)
        console.log("Database name " + dbname + " is set")
    }

    components.find = function(query, collection, callback) {
        db[collection].find(query, function (err, docs) {
            callback(err, docs)
        })
    }

    components.findOne = function(query, collection, callback) {
        db[collection].findOne(query, function (err, doc) {
            callback(err, doc)
        })
    }

    components.insert = function(collection, doc) {
        console.log(doc)
        db[collection].insert(doc)
    }

    components.count = function(query, collection, callback) {
        db[collection].count(query, function(err, count) {
            console.log(err)
            callback(err, count)
        })
    }

    components.update = function(query, update, collection, callback) {
        db[collection].update(query, update, function(err, result) {
            console.log(err)
            console.log(result)
            callback(err, result)
        })
    }

    components.delete = function(query, collection, callback) {
        db[collection].remove(query, function(err, data) {
            console.log(err)
            callback(err, data)
        })
    }
    return (components)
}
