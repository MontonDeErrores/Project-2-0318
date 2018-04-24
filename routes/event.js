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



//CRUD --- New Event
eventRoutes.get("/new", ensureLoggedIn('/auth/login'), (req, res) => {
  res.render("event/new")
});

// CRUD --- New Event
eventRoutes.post("/new", [ensureLoggedIn('/auth/login'), uploadCloud.single("photo")] ,(req, res, next) => {
  const {name, description, date} = req.body;
  const {pool, bbq, children, wifi, private, roof, parking} = req.body;
  const options = {hasPool: pool, hasBBQ: bbq, hasChildren: children, hasWifi: wifi, isPrivate: private, hasRoof: roof, hasParking: parking};
  const photo = req.file.url;
  let location = {
    type: "Point",
    coordinates: [req.body.longitude, req.body.latitude]
  };
  
  const newEvent = new Events({
    name,
    description,
    photo,
    date,
    location,
    options,
    admin: req.user.id});
    console.log(newEvent);
  newEvent.save().then(event => {

    User.findById(req.user.id)
    .then((user) => {
      console.log(user.events);
      user.events.push(event._id);
      console.log(user.events);
      user.save()
      .then((user) =>{
        console.log(user.events)
        res.redirect(`/event/${event_id}`)

      })
      .catch((err) => next(err))
    })
    .catch(error => {
      next();
    })
  })
});

//CRUD --- Edit Event
eventRoutes.get("/edit", ensureLoggedIn('/auth/login'), (req, res) => {
  res.render("event/edit")
});

eventRoutes.post("/:id/edit", [ensureLoggedIn('/auth/login'), uploadCloud.single("photo")] ,(req, res) => {
  let id = req.params.id;
  const {name, description, date} = req.body;
  const {pool, bbq, children, wifi, private, roof, parking} = req.body;
  const options = {hasPool: pool, hasBBQ: bbq, hasChildren: children, hasWifi: wifi, isPrivate: private, hasRoof: roof, hasParking: parking};
  const photo = req.file.url;
  let location = {
    type: "Point",
    coordinates: [req.body.longitude, req.body.latitude]
  };
  
  const updateEvent = {
    name,
    description,
    photo,
    date,
    location,
    options};

    Events.findByIdAndUpdate(id, updateEvent)
  .then((event) => {
    res.redirect(`/event/${event_id}`);
  })
  .catch(error => {
    next();
  })
});



//CRUD --- Event profile
eventRoutes.get("/:id", ensureLoggedIn('/auth/login'), (req, res, next) => {
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