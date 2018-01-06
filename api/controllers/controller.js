"use strict";
var sha256 = require("../../sha256");
var mongoose = require("mongoose");
var User = mongoose.model("Users");
var Log = mongoose.model("Logs");
var Guid = mongoose.model("Guids");

function createLog(api_call, req, guid){
    var ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    var new_log = new Log({"api_call": api_call, "ip": ip, "guid": guid});
    new_log.save();
}

//Status: Done
//log: Done
exports.show_api_info = function(req, res) {
    var ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    var new_log = new Log({"api_call": "show_api_info", "ip": ip});
    new_log.save();
    var json = { message: "api info"};
    res.send(JSON.stringify(json, null, 4));
};

//Status: Done
//log: done
exports.route_requires_authentication = function(req, res) {
    var ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    var new_log = new Log({"api_call": "route_requires_authentication", "ip": ip});
    new_log.save();
    var json = { message: "Requires authentication"};
    res.send(JSON.stringify(json, null, 4));
};

//Status:
//log
exports.guid_get_guid = function(req, res) {
    createLog("guid_get_guid", req);
     function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890-_";
        for (var i = 0; i < 12; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
    var output = {
        "rand64": makeid(),
        "hash": "",
        "ip": req.headers["x-forwarded-for"] || req.connection.remoteAddress,
        "acceptEncoding": req.headers["accept-encoding"] || req.headers.accept-encoding,
        "acceptLanguage": req.headers["accept-language"] || req.headers.accept-language,
        "userAgent": req.headers["user-agent"] || req.headers.user-agent,
        timeOpened:new Date(),
        timezone:(new Date()).getTimezoneOffset()/60,
    }

    output.hash = sha256(output.rand64 + output.ip + output.acceptEncoding + output.acceptLanguage + output.userAgent);

    var new_guid = new Guid(output);
    new_guid.save();

    var ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    var new_log = new Log({"api_call": "guid_get_guid", "ip": ip});
    new_log.save();

    var json = {guid: output.rand64};
    res.send(JSON.stringify(json, null, 4));
};

//Status:
//Log: Done
exports.guid_check_guid = function(req, res) {
    createLog("guid_check_guid", req);
    if(req.body.guid) {
        User.count({"guid": req.body.guid}, function(err, task) {
            if(task === 1){
                var json = {result: true};
                res.send(JSON.stringify(json, null, 4));
            } else {
                var json = {message: "No matching GUID", result: false};
                res.send(JSON.stringify(json, null, 4));
            }
        });
    } else {
        var json = {message: "guid must be provided", result: false};
        res.send(JSON.stringify(json, null, 4));
    }

//     var output = {
//         "ip": req.headers["x-forwarded-for"] || req.connection.remoteAddress,
//         "accept-encoding": req.headers["accept-encoding"] || req.headers.accept-encoding,
//         "accept-language": req.headers["accept-language"] || req.headers.accept-language,
//         "user-agent": req.headers["user-agent"] || req.headers.user-agent
//     }
//
//     output.hash = sha256(output.rand64 + output.ip + output.acceptEncoding + output.acceptLanguage + output.userAgent);
//
// //User.find({}, function(err, task) {
//
//     var json = {id: output.rand64};
//
//     res.send(JSON.stringify(json, null, 4));
};



//Status:
exports.list_all_users = function(req, res) {
    $.getJSON("//freegeoip.net/json/?callback=?", function(data) {
        var new_log = new Log({"api_call": "list_all_users", "ip": data.ip});
        new_log.save();
    });
    User.find({}, function(err, task) {
        if (err)
        res.send(err);
        res.json(task);
    });
};

//Status:
exports.create_user = function(req, res) {
    if(req.body.email == undefined || req.body.firstName == undefined || req.body.lastName == undefined ||  req.body.password == undefined || req.body.zxcvbn == undefined || req.body.homePostcode == undefined || req.body.workLocation == undefined){
        res.json({ message: "Error not enough arguments provided" });

    } else {

        var user;
        user.name.first = req.body.firstName;
        var new_task = new User(user);
        new_task.save(function(err, task) {
            if (err){
                res.send(err);
            }
            res.json({ message: "successfully created user" });
        });
    }
};

exports.get_user = function(req, res) {

    User.find("id");
    res.json({ message: req.params.id });
};



// exports.list_all_tasks = function(req, res) {
//     Task.find({}, function(err, task) {
//         if (err)
//         res.send(err);
//         res.json(task);
//     });
// };
//
// exports.create_a_task = function(req, res) {
//     var new_task = new User(req.body);
//     new_task.save(function(err, task) {
//         if (err)
//         res.send(err);
//         res.json(task);
//     });
// };
//
// exports.read_a_task = function(req, res) {
//     Task.findById(req.params.taskId, function(err, task) {
//         if (err)
//         res.send(err);
//         res.json(task);
//     });
// };
//
// exports.update_a_task = function(req, res) {
//     Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
//         if (err)
//         res.send(err);
//         res.json(task);
//     });
// };
//
// exports.delete_a_task = function(req, res) {
//     Task.remove({
//         _id: req.params.taskId
//     }, function(err, task) {
//         if (err)
//         res.send(err);
//         res.json({ message: "Task successfully deleted" });
//     });
// };
