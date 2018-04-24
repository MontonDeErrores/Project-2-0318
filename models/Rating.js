const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ratingSchema = new Schema({
  userRated: { type: Schema.Types.ObjectId, ref: 'User' },
  userRating: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  rating:  {type: String, enum: ["Really Bad","Bad","Ok","Good","Very Good"]},
  comment: String
});

const Rating = mongoose.model('Rating', ratingSchema);
module.exports = Rating;