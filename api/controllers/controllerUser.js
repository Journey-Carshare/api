var express = require("express");
var mongoose = require("mongoose");
var User = mongoose.model("Users");
var async = require('async');

module.exports.checkUserExists = function (body, res) {
    "use strict";
    //Check if user already exists
    User.count({email: body.email}).exec(function (err, docs) {
        if (err) {
            res.status(500);
            res.json({"Error": "Email Error"});
            return;
        }
        if (docs.length) {
            res.status(500);
            res.json({"Error": "Email already exists"});
            return;
        } else {
            return;
        }
    });
    return true;
};

module.exports.checkZxcvbnEquivalence = function (body) {
    "use strict";
    //Check zxcvbn for password strength and equivalence
    var zxcvbn = require("../../node_modules/zxcvbn/dist/zxcvbn.js");
    var zxcvbnOutput = zxcvbn(body.password);
    if (zxcvbnOutput.score != body.zxcvbn) {
        return false;
    } else {
        return true;
    }
};

module.exports.checkZxcvbnStrength = function (body) {
    "use strict";
    //Check zxcvbn for password strength and equivalence
    var zxcvbn = require("../../node_modules/zxcvbn/dist/zxcvbn.js");
    var zxcvbnOutput = zxcvbn(body.password);
    if (body.zxcvbn < 3) {
        return false;
    } else {
        return true;
    }
};

module.exports.getZxcvbn = function (body) {
    "use strict";
    //Calculate zxcvbn
    var zxcvbn = require("../../node_modules/zxcvbn/dist/zxcvbn.js");
    return zxcvbn(body.password);
};

module.exports.createUser = function (User, newUser) {
    "use strict";
    newUser.save(function (err) {
        if (err) {
            var output = {
                "name": err.name,
                "message": err.message
            };
            res.send(output);
        } else {
            return;
        }
    });
};


module.exports.createUser = function(body, callback){
    //Check if all required headers are present
    if(body.email === undefined || body.firstName === undefined || body.lastName === undefined ||  body.password === undefined || body.zxcvbn === undefined || body.homePostcode === undefined || body.workLocation === undefined  || body.phone === undefined){
        return callback('Not Enough Input Arguments');
    } else {

        var cu = require("./controllerUser");

        //Check if User already exists
        User.count({email: body.email}).exec(function (err, docs) {
            if (err) {
                return callback('Email Error');
                return;
            }
            if (docs.length) {
                return callback('User already exists');
            } else {
                return;
            }
        });

        //Check if zxcvbn client and server are equivalent
        if(cu.checkZxcvbnEquivalence(body)){

            //Check password strength
            if(cu.checkZxcvbnStrength(body)){

                //Get server interpretation of zxcvbn
                var zxcvbnOutput = cu.getZxcvbn(body);

                //Hash Password
                //var passwordHash = require("");
                //hashedPassword = passwordHash(body.password);
                //https://www.npmjs.com/package/argon2

                //Set up user
                var user = {
                    "email": body.email,
                    "name": {
                        "first": body.firstName,
                        "last": body.lastName
                    },
                    "password": {
                        "hash": body.password,
                        "zxcvbnClient": body.zxcvbn,
                        "zxcvbnServer": zxcvbnOutput.score
                    },
                    "phoneNo": body.phone,
                    "address": {
                        "home": {
                            "postcode": body.homePostcode
                        },
                        "work": {
                            "location": body.workLocation
                        }
                    }
                };

                //create new user
                var newUser = new User(user);

                cu.createUser(User, newUser);


            } else {
                return callback('password is not strong enough');
            }

        } else {
            return callback('zxcvbn equivalence error');
        }
        // } else {
        //     res.json({error: "Email Error"});
        //     return;
        // }
    }
}
