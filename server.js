var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require("mongoose");
var User = require("./api/models/model"); //created model loading here
var bodyParser = require("body-parser");

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
process.on("unhandledRejection", (err) => console.log(err.stack));
//mongoose.connect("mongodb://localhost:27017/journeyBackend", {useMongoClient: true});
mongoose.connect("mongodb://admin:k12aTy*st4Ufy20c5&tT@ds163494.mlab.com:63494/journey", {useMongoClient: true});


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var routes = require("./api/routes/routes"); //importing route
routes(app); //register the route


app.listen(port);

console.log("todo list RESTful API server started on: " + port);

app.use(function (req, res) {
    "use strict";
    res.status(404).send({url: req.originalUrl + " not found"});
});
