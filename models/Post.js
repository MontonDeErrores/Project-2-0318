const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const postSchema = new Schema({
  eventPosted: { type: Schema.Types.ObjectId, ref: 'Event' },
  userPosting: { type: Schema.Types.ObjectId, ref: 'User' },
  post: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;