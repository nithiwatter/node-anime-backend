const Anime = require('../models/animeModel');
const APIFeatures = require('../utils/apifeatures');

exports.aliasTopAnimes = (req, res, next) => {
  req.query = { sort: '-ratingsAverage,name', limit: 3 };
  next();
};

exports.getAllAnimes = async (req, res) => {
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
    console.log(err);
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getAnime = async (req, res) => {
  try {
    const anime = await Anime.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        anime,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.checkCreateAnime = (req, res, next) => {
  if (!req.body.name || !req.body.ratingsAverage) {
    return res.status(404).json({
      status: 'fail',
      message: 'No name or ratings',
    });
  }
  next();
};

exports.createAnime = async (req, res) => {
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
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

exports.updateAnime = async (req, res) => {
  try {
    console.log(req.body.synopsis);
    const anime = await Anime.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        anime,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteAnime = async (req, res) => {
  try {
    const anime = await Anime.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        anime,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getAnimeStats = async (req, res) => {
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
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
