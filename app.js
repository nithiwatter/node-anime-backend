const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const animeRouter = require('./routes/animeRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorControllers');

const app = express();

if (process.env.NODE_ENV === 'development') {
  const corsOptions = {
    origin: 'http://127.0.0.1:5500',
    credentials: true,
  };
  app.use(cors(corsOptions));
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 300,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP. Please try again in an hour',
});

app.use('/api', limiter);
app.use(express.json());

app.use('/api/animes', animeRouter);
app.use('/api/users', userRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server...`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
