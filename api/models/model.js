'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
  email: {
    type: String,
    required: 'You are missing the email'
  },
  first_name: {
    type: String,
    required: 'You are missing the first name'
  },
  last_name: {
    type: String,
    required: 'You are missing the last name'
  },
  password: {
    type: String,
    required: 'You are missing the password'
  },
  postcode: {
    type: String,
    required: 'You are missing the postcode'
  },
  phone_no: {
    type: String,
    required: 'You are missing the phone_no'
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  last_login: {
    type: Date,
    default: Date.now
  },
  account_status: {
    type: [{
      type: String,
      enum: ['pending', 'activated', 'deactivated']
    }],
    default: ['pending']
  },
  account_rank: {
    type: [{
      type: String,
      enum: ['standard', 'admin']
    }],
    default: ['standard']
  }
});

module.exports = mongoose.model('Users', UsersSchema);

var LoggingSchema = new Schema({
  api_call: {
    type: String,
    default: 'Test'
    //required: 'You are missing the call'
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  ip: {
    type: String
  }
});

module.exports = mongoose.model('Logs', LoggingSchema);
