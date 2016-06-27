var routingModule = require("./RoutingModule")
var mongoModule = require("./MongoModule")
var route = routingModule()
var mongo = mongoModule()
var consolidate = require("consolidate")
var bcrypt = require("bcrypt")
var sha1 = require("sha1")
var url = require("url")
var fs = require("fs")
var SALT = "jfoasfiP*#JRIOPR#IJO:RL!R:OILFjapwoiefljan34t09aepor;iljgi2p39woir"
var session = {}
var ObjectId = require('mongodb').ObjectId;

mongo.setDatabase("app")

route.get("/", function(request, response) {
    mongo.find({ $query: {}, $orderby: { timestamp: -1 } }, "announcements", function(err, data) {
        consolidate.swig("public/index.html", {announcements: data, date: new Date()}, function(err, html) {
            response.send(html)
        })
    })
})

route.get("/admin/login", function(request, response) {

    mongo.find({}, "users", function(err, data) {
        if (data) {
            consolidate.swig("public/admin-login.html", {}, function(err, html) {
                response.send(html)
            })
        } else {
            response.writeHead(302, {"Location" : "/admin/config"})
            response.end()
        }
    })
})

route.post("/admin/login", function(request, response) {
    response.writeHead(200, {"Content-Type" : "application/json"})
    var data = ""
    request.on('data', function(rawData) {
        data += rawData
    })
    request.on('end', function() {
        var json = JSON.parse(data)
        var query = {username: json.username}
        var rawPassword = json.password + SALT

        mongo.findOne(query, "users", function(err, qData) {
            if (qData) {
                bcrypt.compare(rawPassword, qData.password, function(err, verify) {
                    if (verify) {
                        var rawText = new Date() + data.username + SALT
                        var accessToken = sha1(rawText)
                        session[accessToken] = qData
                        var res = {user: qData, authResponse: true, message: "Authentication Successful", accessToken: accessToken}
                        response.end(JSON.stringify(res))
                    } else {
                        var res = {authResponse: false, message: "Invalid Credentials"}
                        response.end(JSON.stringify(res))
                    }
                })
            } else {
                var res = {authResponse: false, message: "Invalid Credentials"}
                response.end(JSON.stringify(res))
            }
        })
    })
})

route.post("/admin/register", function(request, response) {
    var data = ""
    request.on('data', function(dataStream) {
        data += dataStream
    })
    request.on('end', function() {
        var json = JSON.parse(data)
        console.log(json);
        response.writeHead(200, {"Content-Type" : "application/json"})

        mongo.findOne({username: json.username}, "users", function(err, doc) {
            if (doc) {
                var res = {authResponse: false, message: "Username already exists"}
                response.end(JSON.stringify(res))
            } else {
                bcrypt.hash(json.password + SALT, 10, function(err, hash) {
                    json.password = hash
                    mongo.insert("users", json)
                })
                var res = {authResponse: true, message: "Registration Successful"}
                response.end(JSON.stringify(res))
            }
        })
    })
})

route.get("/admin/registration", function(request, response) {
    var req = url.parse(request.url, true, true)

    var user = session[req.query.access_token]

    if (!user) {
        consolidate.swig("public/landing-notification-page.html", {message: "You are forbidden to access this resource", error: true}, function(err, html) {
            response.send(html)
        })
    }

    consolidate.swig("public/admin-registration.html", {user: user, accessToken: req.query.access_token}, function(err, html) {
        response.send(html)
    })
})

route.get("/admin/config", function(request, response) {
    consolidate.swig("public/admin-config.html", {}, function(err, html) {
        response.send(html)
    })
})

route.post("/admin/announcement/add", function(request, response) {
    var data = ""
    request.on('data', function(dataStream) {
        data += dataStream
    })
    request.on('end', function() {
        var json = JSON.parse(data)
        response.writeHead(200, {"Content-Type" : "application/json"})

        if (!session[json.admin]) {
            var res = {successful : false, message: "You are forbidden to access this resource"}
            response.end(JSON.stringify(res))
        } else {
            var admin = session[json.admin]
            delete admin.password
            json.admin = admin

            mongo.insert("announcements", json)

            var res = {successful : true, message: "Announcement Successfully Posted"}
            response.end(JSON.stringify(res))
        }
    })
})

route.get("/admin/announcement/add", function(request, response) {
    var req = url.parse(request.url, true, true)

    var user = session[req.query.access_token]

    if (!user) {
        consolidate.swig("public/landing-notification-page.html", {message: "You are forbidden to access this resource", error: true}, function(err, html) {
            response.send(html)
        })
    } else {
        consolidate.swig("public/admin-add-announcement.html", {user: user, accessToken: req.query.access_token}, function(err, html) {
            response.send(html)
        })
    }
})

route.get("/admin", function(request, response) {
    var req = url.parse(request.url, true, true)

    var user = session[req.query.access_token]

    if (!user) {
        consolidate.swig("public/landing-notification-page.html", {message: "You are forbidden to access this resource", error: true}, function(err, html) {
            response.send(html)
        })
    } else {
        mongo.findOne({}, "announcements", function(err, data) {
            mongo.count({}, "announcements", function(errCount, count) {
                consolidate.swig("public/admin-panel.html", {user: user, announcement: data, count: count, accessToken: req.query.access_token}, function(err, html) {
                    response.send(html)
                })
            })
        })
    }
})

route.get("/announcement", function(request, response) {
    var req = url.parse(request.url, true, true)

    var id = req.query.id

    mongo.findOne({ _id: ObjectId(id)  }, "announcements", function(err, data) {
        console.log(data);
        consolidate.swig("public/single-announcement.html", {announcement: data}, function(err, html) {
            response.send(html)
        })
    })
})

route.get("/admin/announcements/manage", function(request, response) {
    var req = url.parse(request.url, true, true)

    var user = session[req.query.access_token]

    if (!user) {
        consolidate.swig("public/landing-notification-page.html", {message: "You are forbidden to access this resource", error: true}, function(err, html) {
            response.send(html)
        })
    } else {
        mongo.find({ $query: {}, $orderby: { timestamp: -1 } }, "announcements", function(err, data) {
            consolidate.swig("public/admin-manage-announcements.html", {user: user, announcements: data, accessToken: req.query.access_token}, function(err, html) {
                response.send(html)
            })
        })
    }
})

route.post("/admin/announcement/edit", function(request, response) {

    var data = ""

    request.on('data', function(dataStream) {
        data += dataStream
        console.log(data.toString());
    })

    request.on('end', function() {
        var json = JSON.parse(data)
        console.log(json);
        var user = session[json.accessToken]

        if (!user) {
            consolidate.swig("public/landing-notification-page.html", {message: "You are forbidden to access this resource", error: true}, function(err, html) {
                response.send(html)
            })
        } else {
            mongo.findOne({_id : ObjectId(json.announcementId)}, "announcements", function(err, data) {
                consolidate.swig("public/admin-edit-announcement.html", {accessToken: json.accessToken, announcement: data}, function(err, html) {
                    response.send(html)
                })
            })
        }
    })
})

route.post("/admin/announcement/edit/action", function(request, response) {
    var data = ""
    request.on('data', function(dataStream) {
        data += dataStream
    })
    request.on('end', function() {
        var json = JSON.parse(data)
        console.log(json);
        response.writeHead(200, {"Content-Type" : "application/json"})

        if (!session[json.admin]) {
            var res = {successful : false, message: "You are forbidden to access this resource"}
            response.end(JSON.stringify(res))
        } else {
            var admin = session[json.admin]
            var id = json.announcementId

            delete json.announcementId
            delete admin.password

            json.admin = admin

            if (json.file) {
                console.log("File Overwrite");
                mongo.update({_id: ObjectId(id)}, {$set : {title: json.title, content: json.content, type: json.type, edited: json.admin, editedOn: json.editedOn, file: json.file}}, "announcements", function(err, result) {
                    var res = {successful : true, message: "Announcement Successfully Edited"}
                    response.end(JSON.stringify(res))
                })
            } else {
                console.log("NO File Overwrite");
                mongo.update({_id: ObjectId(id)}, {$set : {title: json.title, content: json.content, type: json.type, edited: json.admin, editedOn: json.editedOn}}, "announcements", function(err, result) {
                    var res = {successful : true, message: "Announcement Successfully Edited"}
                    response.end(JSON.stringify(res))
                })
            }
        }
    })
})

route.post("/admin/announcement/delete", function(request, response) {
    var data = ""
    request.on('data', function(dataStream) {
        data += dataStream
    })
    request.on('end', function() {
        var json = JSON.parse(data)
        console.log(json);
        response.writeHead(200, {"Content-Type" : "application/json"})

        if (!session[json.accessToken]) {
            var res = {successful : false, message: "You are forbidden to access this resource"}
            response.end(JSON.stringify(res))
        } else {
            mongo.delete({_id : ObjectId(json.announcementId)}, "announcements", function(err, data) {
                var res = {successful : true, message: "Announcement deleted successfully"}
                response.end(JSON.stringify(res))
            })
        }
    })
})

route.get("/admin/logout", function(request, response) {
    var req = url.parse(request.url, true, true)

    var user = session[req.query.access_token]

    if (!user) {
        consolidate.swig("public/landing-notification-page.html", {message: "You are forbidden to access this resource", error: true}, function(err, html) {
            response.send(html)
        })
    } else {
        delete session[req.query.access_token]
        consolidate.swig("public/landing-notification-page.html", {message: "Logout Successful", error: false}, function(err, html) {
            response.send(html)
        })
    }
})

route.listen(1234)
