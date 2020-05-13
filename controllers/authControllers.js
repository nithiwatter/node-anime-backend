const User = require('../models/userModel');
const AppError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
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
