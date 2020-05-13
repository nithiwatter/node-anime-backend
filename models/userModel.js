const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

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
  role: {
    type: String,
    default: 'member',
    enum: {
      values: ['member', 'moderator'],
      message: 'A user is either a member or moderator',
    },
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
  passwordChangedAt: {
    type: Date,
  },
  passwordResetToken: String,
  passwordResetExpire: Date,
});

userSchema.pre('save', async function (next) {
  // validation runs before pre hook - so passwords being equal would have already been checked
  // for update, ensure that only if password has been modified would this get executed
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);

  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  correctHashedPassword
) {
  return await bcrypt.compare(candidatePassword, correctHashedPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  // Some users may have never changed their passwords
  if (this.passwordChangedAt) {
    const changedTimestamp = this.passwordChangedAt.getTime() / 1000;
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  // Storing the hashed version in DB/sending the non-hashed version to user (so user cannot tample with the token)
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Have 10 minutes to reset the password
  this.passwordResetExpire = Date.now() + 10 * 60 * 1000;
  console.log(resetToken, this.passwordResetToken);
  return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
