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
    hasWifi: String,
    isPrivate: Boolean,
    hasRoof: Boolean,
    hasParking: Boolean
  },
  description: String,
  photo: String,
  admin: String enlazar
});

eventSchema.index({ location: "2dsphere" });

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;