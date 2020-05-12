const express = require('express');
const morgan = require('morgan');
const animeRouter = require('./routes/animeRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

app.use('/api/animes', animeRouter);
app.use('/api/users', userRouter);
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Cannot find ${req.originalUrl} on this server...`,
  });
});

module.exports = app;
