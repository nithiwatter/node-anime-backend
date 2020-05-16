const express = require('express');
const authController = require('../controllers/authControllers');
const reviewController = require('../controllers/reviewControllers');

const reviewRouter = express.Router();
reviewRouter
  .route('/')
  .get(authController.protect, reviewController.getAllReviews);

module.exports = reviewRouter;
