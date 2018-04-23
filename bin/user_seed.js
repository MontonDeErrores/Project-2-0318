require("dotenv").config();

const mongoose = require("mongoose");
const User = require('../models/User');
const Event = require('../models/Event');

const Schema = mongoose.Schema;

mongoose
  .connect(`mongodb://localhost/${process.env.DBURL}`, {
    useMongoClient: true
  })
  .then(() => {
    console.log("Connected to Mongo!");
    return User.create([
      {
        username: "Pedro",
        password: "1234",
        email: "a@a.es",
        photo: "http://res.cloudinary.com/ignlopezsanchez/image/upload/v1524492820/perfilPedro.png",
        events: [{ type: Schema.Types.ObjectId, ref: 'Event' }] 
      },
      {
        username: "Nacho",
        password: "1234",
        email: "b@b.es",
        photo: "http://res.cloudinary.com/ignlopezsanchez/image/upload/v1524492820/perfilNacho.png",
        events: [{ type: Schema.Types.ObjectId, ref: 'Event' }]
      }
    ]);
  })
  .then( () => mongoose.disconnect())
  .catch(err => {
    console.error("Error connecting to mongo", err);
});