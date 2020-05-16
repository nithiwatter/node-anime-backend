const AppError = require('../utils/appError');
const User = require('../models/userModel');

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('+password');

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.updateMe = async (req, res, next) => {
  try {
    // Create error if user posts password data
    if (req.body.password || req.body.passwordConfirm) {
      return next(new AppError('This route is not for password updates', 400));
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.deactivateMe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
