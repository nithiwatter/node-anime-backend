const AppError = require('../utils/appError');

exports.handleDelete = (model) => {
  return async (req, res, next) => {
    try {
      const doc = await model.findByIdAndDelete(req.params.id);

      if (!doc) {
        return next(new AppError('No document found with that ID', 404));
      }

      res.status(204).json({
        status: 'success',
        data: null,
      });
    } catch (err) {
      next(err);
    }
  };
};
