const express = require("express");
const passport = require('passport');
const eventRoutes = express.Router();
const User = require("../models/User");
const Events = require("../models/Event");
const uploadCloud = require("../config/cloudinary.js");
const ensureLoggedOut = require('../middlewares/ensureLoggedOut');
const ensureLoggedIn = require('../middlewares/ensureLoggedIn');
const isAdmin = require('../middlewares/isAdmin');


eventRoutes.get("/:id",ensureLoggedIn('/auth/login'), (req, res, next) => {
  let eventId = req.params.id;
  Events.findById(eventId).then(event => {
    res.render("event/dashboard", {event}, { "message": req.flash("error") });
  })
  
});








module.exports = eventRoutes;