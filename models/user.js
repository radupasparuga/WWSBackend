const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName:{
      type: String,
      required: true
    },
    lastName:{
      type: String,
      required: true
    },
    username:{
      type: String,
      required: true
    },
    country:{
      type: String,
      required: true
    },
    region:{
      type: String,
      required: true
    },
    password:{
      type: String,
      required: true
    },
    postCount:{
      type: Number
    },
    posts:[{
      type: String
    }],
    friends:[{
      type: String
    }],
    friendsCount:{
      type: Number
    }
  });

const User = mongoose.model('users', UserSchema);

module.exports = User;