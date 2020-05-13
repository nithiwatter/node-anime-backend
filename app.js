const express = require('express');
const morgan = require('morgan');
const animeRouter = require('./routes/animeRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorControllers');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

app.use('/api/animes', animeRouter);
app.use('/api/users', userRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server...`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
