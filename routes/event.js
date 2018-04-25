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
const isCreator = require('../middlewares/isCreator');


eventRoutes.get('/new', (req, res, next) => {
  res.render('event/new');
});



//CRUD --- New Event
eventRoutes.get("/new", ensureLoggedIn('/auth/login'), (req, res) => {
  res.render("event/new")
});

eventRoutes.post("/new", [ensureLoggedIn('/auth/login'), uploadCloud.single("photo")] ,(req, res, next) => {
  let date = req.body.date;
 
  const {name, description} = req.body;
  const {pool, bbq, children, wifi, private, roof, parking} = req.body;
  const options = {hasPool: pool, hasBBQ: bbq, hasChildren: children, hasWifi: wifi, isPrivate: private, hasRoof: roof, hasParking: parking};
  if (req.file){
     photo = req.file.url;

  }
  else{
    photo = "http://res.cloudinary.com/ignlopezsanchez/image/upload/v1524656034/partyHard.png";
  }
  let location = {
    type: "Point",
    coordinates: [req.body.latitude, req.body.longitude]
  };
  
  const newEvent = new Events({
    name,
    description,
    photo,
    date,
    location,
    options,
    admin: req.user.id});
  newEvent.save().then(event => {

    User.findById(req.user.id)
    .then((user) => {
      user.events.unshift(event._id);
      user.save()
      .then((user) =>{
        res.redirect(`/`)

      })
      .catch((err) => next(err))
    })
    .catch(error => {
      next();
    })
  })
});

//CRUD --- Edit Event
eventRoutes.get("/:id/edit", ensureLoggedIn('/auth/login'), (req, res) => {
  
  let id = req.params.id;
  isCreator(id, req.user.id).then((creator)=>{
    if (creator){
      Events.findById(id).then((event) => {
        let date = event.date;        
        date = date.toLocaleString().split(" ")[0].split("-").map((e, i)=>{
          if (e.length < 2 && i>0){
            return "0"+e
          }
          return e;
        }).join("-");
      res.render("event/edit", {event, date})
      })
      .catch((err)=>{
        console.log(err);
      })
    }
    else {
      res.redirect("/")
    }
  })
});

eventRoutes.post("/:id/edit", [ensureLoggedIn('/auth/login'), uploadCloud.single("photo")] ,(req, res, next) => {
  let id = req.params.id;
  const {name, description, date} = req.body;
  console.log(req.body);
  const {pool, bbq, children, wifi, private, roof, parking} = req.body;
  const options = {hasPool: pool, hasBBQ: bbq, hasChildren: children, hasWifi: wifi, isPrivate: private, hasRoof: roof, hasParking: parking};
  let location = {
    type: "Point",
    coordinates: [req.body.longitude, req.body.latitude]
  };    

  if (req.file){
      var photo = req.file.url;
      var updateEvent = {
        name,
        description,
        photo,
        date,
        location,
        options};
  }
  else{
    var updateEvent = {
      name,
      description,
      date,
      location,
      options};
  }

    Events.findByIdAndUpdate(id, updateEvent)
  .then((event) => {
    res.redirect(`/`);
  })
  .catch(error => {
    console.log(error);
    next();
  })
  
});



//CRUD --- Event profile
eventRoutes.get("/:id", ensureLoggedIn('/auth/login'), (req, res, next) => {
  let eventId = req.params.id;
  if (isInEvent(eventId, req.user)) {
    Events.findById(eventId).then(event => {
      User.find({"events": eventId}).then(users => {
        res.render("event/dashboard", {event, users} );
      })
  })
}
  else {
    res.redirect("/")
  }
  
});



module.exports = eventRoutes;