const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'A confirm password is required'],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
});

userSchema.pre('save', async function (next) {
  // validation runs before pre hook - so passwords being equal would have already been checked
  // for update, ensure that only if password has been modified would this get executed
  if (!this.isModified('password')) return next();
  console.log(this.password);
  this.password = await bcrypt.hash(this.password, 10);
  console.log(this.password);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  correctHashedPassword
) {
  return await bcrypt.compare(candidatePassword, correctHashedPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
