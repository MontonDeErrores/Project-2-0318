const express = require("express");
const passport = require('passport');
const eventRoutes = express.Router();
const User = require("../models/User");
const Events = require("../models/Event");
const uploadCloud = require("../config/cloudinary.js");
const ensureLoggedOut = require('../middlewares/ensureLoggedOut');
const ensureLoggedIn = require('../middlewares/ensureLoggedIn');
const isAdmin = require('../middlewares/isAdmin');
const isInEvent = require('../middlewares/isInEvent');

eventRoutes.get('/new', (req, res, next) => {
  res.render('event/new');
});


eventRoutes.get("/:id",ensureLoggedIn('/auth/login'), (req, res, next) => {
  let eventId = req.params.id;
  if (isInEvent(eventId, req.user)) {
    Events.findById(eventId).then(event => {
      console.log(event);
      User.find({"events": eventId}).then(users => {
        console.log(users);

        res.render("event/dashboard", {event, users} );
      })
  })
}
  else {
    res.redirect("/")
  }
  
});



module.exports = eventRoutes;