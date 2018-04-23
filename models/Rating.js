const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ratingSchema = new Schema({
  user: String,
  rating: String,
  comment: String
});

const Rating = mongoose.model('Rating', ratingSchema);
module.exports =Rating;