const express = require('express');
const animeController = require('../controllers/animeControllers');
const authController = require('../controllers/authControllers');
const reviewController = require('../controllers/reviewControllers');

const animeRouter = express.Router();

animeRouter.route('/anime-stats').get(animeController.getAnimeStats);
animeRouter
  .route('/top-3-highest')
  .get(animeController.aliasTopAnimes, animeController.getAllAnimes);
animeRouter
  .route('/favorite-anime-stats')
  .get(animeController.getFavoriteStats);
animeRouter
  .route('/')
  .get(animeController.getAllAnimes)
  .post(animeController.createAnime);
animeRouter
  .route('/:id')
  .get(animeController.getAnime)
  .patch(authController.protect, animeController.updateAnime)
  .delete(
    authController.protect,
    authController.restrictTo('moderator'),
    animeController.deleteAnime
  );
animeRouter
  .route('/favorite/:id')
  .post(authController.protect, animeController.favoriteAnime);
animeRouter
  .route('/:animeId/reviews')
  .post(authController.protect, reviewController.createReview);
module.exports = animeRouter;
