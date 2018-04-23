const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ratingSchema = new Schema({
  userRated: String, enlazar
  userRating: String, enlazar
  rating: String, enum,
  comment: String
});

const Rating = mongoose.model('Rating', ratingSchema);
module.exports =Rating;