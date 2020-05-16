const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Review cannot be empty'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Review must belong to a user'],
  },
  animeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Anime',
    required: [true, 'Review must belong to an anime'],
  },
});

reviewSchema.pre(/^find/, function (next) {
  // this refers to the current query
  this.populate({
    path: 'userId',
    select: 'name email',
  });

  next();
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
