const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  photo: String,
  gender: {type: String, enum: ["Hombre","Mujer"]},
  birthDate: Date,
   events:  [{ type: Schema.Types.ObjectId, ref: 'Event' }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
},
{
  usePushEach: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
