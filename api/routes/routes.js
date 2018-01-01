'use strict';
module.exports = function(app) {
  var journeyBackend = require('../controllers/controller');

  // // todoList Routes
  // app.route('/tasks')
  //   .get(todoList.list_all_tasks)
  //   .post(todoList.create_a_task);
  //
  //
  // app.route('/tasks/:taskId')
  //   .get(todoList.read_a_task)
  //   .put(todoList.update_a_task)
  //   .delete(todoList.delete_a_task);

  app.use (function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
  });

  app.route('/')
    .get(journeyBackend.show_api_info);

  app.route('/users')
    .get(journeyBackend.users_requires_authentication)
    .post(journeyBackend.create_a_user);

    app.route('/getGUID')
    .get(journeyBackend.guid_get_guid)
    .post(journeyBackend.guid_check_guid);
};
