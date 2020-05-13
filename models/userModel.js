const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name is required'],
  },
  email: {
    type: String,
    required: [true, 'An email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'A valid email is required'],
  },
  password: {
    type: String,
    required: [true, 'A password is required'],
    minlength: 4,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'A confirm password is required'],
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
