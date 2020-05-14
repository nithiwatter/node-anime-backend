const User = require('../models/userModel');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const signToken = (id) => {
  console.log(process.env.JWT_EXPIRES_IN);
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res, next) => {
  try {
    // signing up a new user
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role,
    });
    await newUser.save();

    // automatically log in the user by sending JWT
    const token = signToken(newUser._id);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email);

    // Check if email and password exist in the req.body
    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400));
    }

    // Check if the email exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) return next(new AppError('Incorrect email or password', 400));

    // Check if the password is correct
    const correct = await user.correctPassword(password, user.password);
    if (!correct) return next(new AppError('Incorrect email or password', 400));

    // Send JWT token for logging in
    const token = signToken(user._id);

    res.status(200).json({
      status: 'success',
      token,
    });
  } catch (err) {
    next(err);
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token = '';
    // Get the token and check if it is there (by checking headers)
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else {
      return next(
        new AppError('You are not logged in! Please log in to get access', 401)
      );
    }

    // Validate the sent token (any modification to the sent token results in failure)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists
    const user = await User.findById(decoded.id);
    if (!user)
      return next(
        new AppError('The user belonging to this token no longer exists!', 401)
      );
    // Check if user changed password after the token was issued
    if (user.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError(
          'User recently changed password. Please log in again!',
          401
        )
      );
    }

    //All pass, so grant access to protected route
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

exports.restrictTo = (role) => {
  return (req, res, next) => {
    if (req.user.role != role) {
      return next(
        new AppError('You not have permission to perform this action', 403)
      );
    }
    next();
  };
};

exports.forgotPassword = async (req, res, next) => {
  try {
    // Get user based on posted email
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return next(new AppError('There is no user with this email', 404));

    // Create an unhashed reset token and save the hashed one to DB
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // Send the token to the user's email
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/users/resetPassword/${resetToken}`;

    const message = `Forgot your password? Submit a patch request with your new password and passwordConfirm to: ${resetURL}`;

    await sendEmail({
      email: user.email,
      subject: 'Your password reset token',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
      resetToken,
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    // Get user based on the unhashed token
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');
    console.log(123);
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    console.log(user);
    console.log(hashedToken);
    // If token has not expired, and there is a user, set the new password
    if (!user)
      return next(new AppError('Token is invalid or has expired', 400));

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // Log the user in by sending JWT token
    const token = signToken(user._id);

    res.status(200).json({
      status: 'success',
      token,
    });
  } catch (err) {
    next(err);
  }
};
