const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const eventSchema = new Schema({
  name: String,
  date: Date,
  location: { type: { type: String }, coordinates: [Number] },
  options: {
    hasPool: {type: Boolean, default: false},
    hasBBQ: {type: Boolean, default: false},
    hasChildren: {type: Boolean, default: false},
    hasWifi: {type: Boolean, default: false},
    isPrivate: {type: Boolean, default: false},
    hasRoof: {type: Boolean, default: false},
    hasParking: {type: Boolean, default: false}
  },
  description: String,
  photo: String,
  admin:  { type: Schema.Types.ObjectId, ref: 'User' },
  isActive: {type: Boolean, default: true}
});

eventSchema.index({ location: "2dsphere" });

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;