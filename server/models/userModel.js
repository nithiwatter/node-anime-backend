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
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
  },
  truePassword: String,
});

userSchema.pre('save', async function (next) {
  // validation runs before pre hook - so passwords being equal would have already been checked
  // for update, ensure that only if password has been modified would this get executed
  if (!this.isModified('password')) return next();

  // for dev/so you do not have to remember the password
  if (process.env.NODE_ENV === 'development') {
    this.truePassword = this.password;
  }
  this.password = await bcrypt.hash(this.password, 10);

  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  // To prevent the JWT token being issued before passwordChangedAt
  this.passwordChangedAt = Date.now() - 1000;
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
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
