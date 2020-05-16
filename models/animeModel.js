const mongoose = require('mongoose');
const slugify = require('slugify');

const animeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'An anime needs a name'],
      unique: true,
    },
    episodes: {
      type: Number,
      default: 13,
      required: true,
    },
    year: Number,
    studio: {
      type: String,
      default: 'Unknown studio',
      required: true,
    },
    ratingsAverage: {
      type: Number,
      required: [true, 'An anime needs an average rating'],
      min: [0, 'Rating must be above 0'],
      max: [10, 'Rating must be below 10'],
    },
    rank: {
      type: Number,
      required: [true, 'An anime needs a rank'],
      unique: true,
      min: [1, 'Rank must be above 0'],
    },
    synopsis: {
      type: String,
      default: 'Just an anime.',
      required: true,
      trim: true,
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    slug: {
      type: String,
    },
  },
  { id: false }
);

animeSchema.pre('save', function (next) {
  const slug = slugify(this.name, { lower: true });
  this.slug = slug;
  next();
});

animeSchema.virtual('reviews', {
  ref: 'Review', // model I am referencing
  localField: '_id',
  foreignField: 'animeId',
  options: { select: '-__v -_id -createdAt' },
});

animeSchema.set('toObject', { virtuals: true });
animeSchema.set('toJSON', { virtuals: true });
const Anime = mongoose.model('Anime', animeSchema);

module.exports = Anime;
