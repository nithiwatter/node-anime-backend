const express = require('express');
const animeController = require('../controllers/animeControllers');

const animeRouter = express.Router();

animeRouter.route('/anime-stats').get(animeController.getAnimeStats);
animeRouter
  .route('/top-3-highest')
  .get(animeController.aliasTopAnimes, animeController.getAllAnimes);
animeRouter
  .route('/')
  .get(animeController.getAllAnimes)
  .post(animeController.checkCreateAnime, animeController.createAnime);
animeRouter
  .route('/:id')
  .get(animeController.getAnime)
  .patch(animeController.updateAnime)
  .delete(animeController.deleteAnime);

module.exports = animeRouter;
