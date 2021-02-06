const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    minlength: [4, 'Username must be at least 4 characters.'],
    maxlength: [32, 'Username cannot exceed 32 characters.'],
  },
  email: {
    type: String,
    required: 'Email is required.',
    lowercase: true,
    unique: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ],
  },
  password: {
    type: String,
    required: 'Password is required.',
    minlength: [4, 'Password must be at least 4 characters.'],
    maxlength: [32, 'Password cannot exceed 32 characters.'],
  },
  avatar: {
    type: String,
    required: 'Avatar required',
  },
});

userSchema.pre('save', function (next) {
  const user = this;

  bcrypt.genSalt(10, (error, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.verifyPassword = function (inputPassword) {
  return bcrypt.compareSync(inputPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
