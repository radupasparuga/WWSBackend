const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    username:{
      type: String,
      required: true
    },
    post:{
      type: String
    },
  });

const Post = mongoose.model('posts', PostSchema);

module.exports = Post;