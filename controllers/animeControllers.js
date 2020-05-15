const Anime = require('../models/animeModel');
const User = require('../models/userModel');
const Favorite = require('../models/favoriteModel');
const APIFeatures = require('../utils/apifeatures');
const AppError = require('../utils/appError');
const slugify = require('slugify');
const _ = require('underscore');

exports.aliasTopAnimes = (req, res, next) => {
  req.query = { sort: '-ratingsAverage,name', limit: 3 };
  next();
};

exports.getAllAnimes = async (req, res, next) => {
  try {
    const features = new APIFeatures(Anime, req.query);
    features.filter().sort().select().paginate();
    let animes = features.query;

    animes = await animes;

    res.status(200).json({
      status: 'success',
      results: animes.length,
      data: {
        animes,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getAnime = async (req, res, next) => {
  try {
    const anime = await Anime.findById(req.params.id);

    if (!anime) {
      return next(new AppError('No anime founded with this id', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        anime,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.createAnime = async (req, res, next) => {
  try {
    const newAnime = new Anime(req.body);
    await newAnime.save();

    res.status(201).json({
      status: 'success',
      data: {
        anime: newAnime,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.updateAnime = async (req, res, next) => {
  try {
    let update = { ...req.body };

    if (req.body.name) {
      update.slug = slugify(req.body.name, { lower: true });
    }

    const anime = await Anime.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });

    if (!anime) {
      return next(new AppError('No anime founded with this id', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        anime,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteAnime = async (req, res, next) => {
  try {
    const anime = await Anime.findByIdAndDelete(req.params.id);

    if (!anime) {
      return next(new AppError('No anime founded with this id', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        anime,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getAnimeStats = async (req, res, next) => {
  try {
    const overallStats = await Anime.aggregate([
      {
        $group: {
          _id: null,
          min: { $min: '$ratingsAverage' },
          max: { $max: '$ratingsAverage' },
          count: { $sum: 1 },
        },
      },
    ]);

    const yearlyStats = await Anime.aggregate([
      {
        $group: {
          _id: '$year',
          min: { $min: '$ratingsAverage' },
          max: { $max: '$ratingsAverage' },
          count: { $sum: 1 },
          animes: { $push: { name: '$name', studio: '$studio' } },
        },
      },
      {
        $addFields: { year: '$_id' },
      },
      { $project: { _id: 0 } },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        overallStats,
        yearlyStats,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.favoriteAnime = async (req, res, next) => {
  try {
    if (!req.body.userId || !req.params.id) {
      return next(
        new AppError('Missing user or anime. Please resend the request', 400)
      );
    }

    if (
      await Favorite.find({ userId: req.body.userId, animeId: req.params.id })
    ) {
      return next(new AppError('You have already favorited this anime', 400));
    }

    const favorite = await Favorite.create({
      userId: req.body.userId,
      animeId: req.params.id,
    });

    res.status(200).json({
      status: 'success',
      favorite,
    });
  } catch (err) {
    next(err);
  }
};

exports.getFavoriteStats = async (req, res, next) => {
  try {
    const favoriteStats = await Favorite.aggregate([
      {
        $group: {
          _id: '$animeId',
          count: { $sum: 1 },
          users: { $push: '$userId' },
        },
      },
    ]);
    let formattedResult = [];
    for (dex in favoriteStats) {
      formattedResult.push(Anime.findById(favoriteStats[dex]._id));
      formattedResult.push(
        User.find({ _id: favoriteStats[dex].users }).select({
          name: 1,
          email: 1,
          status: 1,
          role: 1,
        })
      );
    }

    formattedResult = await Promise.all(formattedResult);
    let finalResult = [];

    for (dex = 0; dex < formattedResult.length; dex += 2) {
      const anime = {
        anime: formattedResult[dex],
        users: formattedResult[dex + 1],
        count: formattedResult[dex + 1].length,
      };
      finalResult.push(anime);
    }

    finalResult = _.sortBy(finalResult, (el) => -el.anime.ratingsAverage);

    res.status(200).json({
      status: 'success',
      finalResult,
    });
  } catch (err) {
    next(err);
  }
};
