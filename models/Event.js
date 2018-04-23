const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const eventSchema = new Schema({
  name: String,
  date: Date,
  location: { type: { type: String }, coordinates: [Number] },
  options: {
    hasPool: Boolean,
    hasBBQ: Boolean,
    hasChildren: Boolean,
    hasWifi: Boolean,
    isPrivate: Boolean,
    hasRoof: Boolean,
    hasParking: Boolean
  },
  description: String,
  photo: String,
  admin: { type: Schema.Types.ObjectId, ref: 'User' },
  isActive: Boolean
});

eventSchema.index({ location: "2dsphere" });

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;