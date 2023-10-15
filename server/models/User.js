// server/models/User.js
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
    match: [/^[0-9a-zA-Z_.-]+$/, 'username must only contain numbers, letters, "." "-" "_"']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate: [
      {
        validator: function (password) {
          // Use a regular expression to check for at least one letter and one number
          return /^(?=.*[A-Za-z])(?=.*\d).+$/.test(password);
        },
        message: 'Password must contain at least one letter and one number.',
      },
    ],
  },
  tweets: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tweet',
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tweet',
    }
  ]
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
