'use strict';
var mongoose = require('mongoose'),
  //Task = mongoose.model('Tasks');
  User = mongoose.model('Users'),
  Log = mongoose.model('Logs');

exports.list_all_tasks = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.create_a_task = function(req, res) {
  var new_task = new User(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.create_a_user = function(req, res) {
  var new_task = new User(req.body);
  //Task.find({})  //Search for any existing user
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'successfully created user' });
  });
};

exports.list_all_users = function(req, res) {
  $.getJSON('//freegeoip.net/json/?callback=?', function(data) {
    var new_log = new Log({"api_call": "list_all_users", "ip": data.ip});
    new_log.save();
  });
  User.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.delete_a_task = function(req, res) {
  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};
