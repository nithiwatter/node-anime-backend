const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const animeRouter = require('./routes/animeRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorControllers');

const app = express();

app.use(helmet());
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

app.use(express.json());

// Rate limiting and sanitizing against NoSQL and XSS
app.use('/api', limiter);
app.use(mongoSanitize());
app.use(xss());

// Prevent parameter pollution (such as double sort)/whitelisting some fields
app.use(
  hpp({
    whitelist: ['year', 'name', 'rank'],
  })
);

app.use('/api/animes', animeRouter);
app.use('/api/users', userRouter);
app.use('/api/reviews', reviewRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server...`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
