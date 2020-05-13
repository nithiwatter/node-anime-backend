const User = require('../models/userModel');
const AppError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    console.log(token);

    // Validate the sent token (any modification to the sent token results in failure)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    // Check if user still exists
    const user = await User.findById(decoded.id);
    console.log(user);
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
