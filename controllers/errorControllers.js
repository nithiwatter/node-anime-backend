module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let sentError = {
    status: err.status,
    message: err.message,
  };

  if (err.name === 'CastError') {
    console.log(err);
    err.statusCode = 400;
    sentError.message = `Invalid ${err.path}: ${err.value}`;
  }

  res.status(err.statusCode).json(sentError);
};
