const Review = require('../models/reviewModel');

exports.getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find();

    res.status(200).json({
      status: 'success',
      results: reviews.length,
      data: {
        reviews,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.createReview = async (req, res, next) => {
  try {
    const newReview = await Review.create({
      animeId: req.params.animeId,
      userId: req.user._id,
      review: req.body.review,
      rating: req.body.rating,
    });

    res.status(201).json({
      status: 'success',
      data: {
        review: newReview,
      },
    });
  } catch (err) {
    next(err);
  }
};
