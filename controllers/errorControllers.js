const handleCastError = (err, sentError) => {
  err.statusCode = 400;
  sentError.message = `Invalid ${err.path}: ${err.value}`;
};

const handleDuplicatedFieldsError = (err, sentError) => {
  err.statusCode = 400;
  sentError.message = `Duplicate field value ${err.errmsg
    .match(/{(.*?)}/)[1]
    .trim()}: Please use another value!`;
};

const handleValidationError = (err, sentError) => {
  err.statusCode = 400;
  let validationMessages = Object.values(err.errors).map((el) => el.message);
  sentError.message = `Validation error${
    validationMessages.length === 1 ? '' : 's'
  }: ${validationMessages.join('. ')}`;
};

const handleJWTError = (err, sentError) => {
  err.statusCode = 401;
  sentError.message = 'Invalid token. Please log in again!';
};

const handleJWTExpiredError = (err, sentError) => {
  err.statusCode = 401;
  sentError.message = 'Your token has expired. Please log in again!';
};

module.exports = (err, req, res, next) => {
  //console.log(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let sentError = {
    status: err.status,
    message: err.message,
  };

  if (err.name === 'CastError') handleCastError(err, sentError);
  if (err.code === 11000) handleDuplicatedFieldsError(err, sentError);
  if (err.name === 'ValidationError') handleValidationError(err, sentError);
  if (err.name === 'JsonWebTokenError') handleJWTError(err, sentError);
  if (err.name === 'TokenExpiredError') handleJWTExpiredError(err, sentError);
  res.status(err.statusCode).json(sentError);
};
