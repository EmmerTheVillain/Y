const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const tweetSchema = new Schema({
  tweetText: {
    type: String,
    required: 'You need to leave a tweet!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  tweetAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Tweet = model('Tweet', tweetSchema);

module.exports = Tweet;
