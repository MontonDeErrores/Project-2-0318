require("dotenv").config();

const mongoose = require("mongoose");
const User = require('../models/User');
const Event = require('../models/Event');
const Rating = require('../models/Rating');

const Schema = mongoose.Schema;

mongoose
  .connect(`mongodb://localhost/${process.env.DBURL}`, {
    useMongoClient: true
  })
  .then(() => {
    console.log("Connected to Mongo!");
    return Rating.create([
      {
      userRated: "5added6d68227b0cca8abe4e",
      userRating: "5added6d68227b0cca8abe4d",
      rating: "Very Good",
      comment: "Menuda fiestaca, me cagaria en la leche!"
      }
    ]);
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });