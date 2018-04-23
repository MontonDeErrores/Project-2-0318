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
    return Event.create([
      {
        name: "Fiesta A",
        date: 01 - 12 - 2018,
        location: { type: "Point", coordinates: [40.3926422, -3.698123] },
        options: {
          hasPool: true,
          hasBBQ: false,
          hasChildren: false,
          hasWifi: true,
          isPrivate: true,
          hasRoof: false,
          hasParking: true
        },
        description: "Muy bonito este evento",
        photo: "",
        admin: "5added6d68227b0cca8abe4d"
      },
      {
        name: "Fiesta B",
        date: 15 - 06 - 2018,
        location: { type: "Point", coordinates: [40.4179591, -3.7165007] },
        options: {
          hasPool: false,
          hasBBQ: false,
          hasChildren: false,
          hasWifi: false,
          isPrivate: false,
          hasRoof: true,
          hasParking: true
        },
        description: "Verano 2018",
        photo: "",
        admin: "5added6d68227b0cca8abe4e"
      }
    ]);
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });