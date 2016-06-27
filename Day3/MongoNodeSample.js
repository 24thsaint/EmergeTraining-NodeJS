var mongojs = require('mongojs')
var dbname = "mysampledb"
var db = mongojs(dbname)
db.maysamplecollection.find(function(err, docs) {
    console.log(docs)
    process.exit(0)
})
