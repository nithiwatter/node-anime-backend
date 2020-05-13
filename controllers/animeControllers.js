const Anime = require('../models/animeModel');
const APIFeatures = require('../utils/apifeatures');
const AppError = require('../utils/appError');
const slugify = require('slugify');

exports.aliasTopAnimes = (req, res, next) => {
  req.query = { sort: '-ratingsAverage,name', limit: 3 };
  next();
};

exports.getAllAnimes = async (req, res) => {
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
