const mongoose = require('mongoose');
      UserModel = require('./user');

const models = {
  User: mongoose.model('User')
}

module.exports = models;