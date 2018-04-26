const express = require("express");
const passport = require('passport');
const eventRoutes = express.Router();
const User = require("../models/User");
const Events = require("../models/Event");
const Post = require("../models/Post");
const uploadCloud = require("../config/cloudinary.js");
const ensureLoggedOut = require('../middlewares/ensureLoggedOut');
const ensureLoggedIn = require('../middlewares/ensureLoggedIn');
const isAdmin = require('../middlewares/isAdmin');
const isInEvent = require('../middlewares/isInEvent');
const isCreator = require('../middlewares/isCreator');
const sendMail = require("../mail/sendMail");



eventRoutes.get('/new', (req, res, next) => {
  res.render('event/new');
});



//CRUD --- New Event
eventRoutes.get("/new", ensureLoggedIn('/auth/login'), (req, res) => {
  res.render("event/new")
});

eventRoutes.post("/new", [ensureLoggedIn('/auth/login'), uploadCloud.single("photo")] ,(req, res, next) => {
  let date = req.body.date;
 
  const {name, description, time} = req.body;
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
    time,
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
  const {name, description, date, time} = req.body;
  const {pool, bbq, children, wifi, private, roof, parking} = req.body;
  const options = {hasPool: pool, hasBBQ: bbq, hasChildren: children, hasWifi: wifi, isPrivate: private, hasRoof: roof, hasParking: parking};
  let location = {
    type: "Point",
    coordinates: [ req.body.latitude, req.body.longitude]
  };    

  if (req.file){
      var photo = req.file.url;
      var updateEvent = {
        name,
        description,
        photo,
        date,
        time,
        location,
        options};
  }
  else{
    var updateEvent = {
      name,
      description,
      date,
      time,
      location,
      options};
  }

    Events.findByIdAndUpdate(id, updateEvent)
  .then((event) => {
    res.redirect(`/event/${id}`);
  })
  .catch(error => {
    console.log(error);
    next();
  })
  
});
//CRUD --- Event invite friends
eventRoutes.post("/:id/invite", ensureLoggedIn('/auth/login'), (req, res, next) => {
  const partyId = req.params.id;
  const mail = req.body.inviteMail;
  User.findOne({"email": mail} )
  .then((user)=>{
    if (user){
      let filtrado = user.events.filter(e=>{       
        return e==partyId
      })
      if (filtrado.length > 0){
        res.redirect(`/event/${partyId}`)
      } else {
        user.events.unshift(partyId);
        user.save().then(u=>{
          res.redirect(`/event/${partyId}`)
        })
      }
    }
    else{
      mensaje =  `http://fiestit.herokuapp.com/auth/signup?key=${partyId}`
      sendMail(mail, mensaje);
      res.redirect(`/event/${partyId}`)
    }    
      
  })
  .catch((err)=>{
    console.log(err);
    next();
  })

})


//CRUD --- Event post
eventRoutes.post("/:id/post", ensureLoggedIn('/auth/login'), (req, res, next) => {
  const eventPosted = req.params.id;
  const userPosting = req.user.id;
  const post = req.body.post;
  const newPost = new Post({
    eventPosted,
    userPosting,
    post})

    newPost.save().then((u)=>{
      res.redirect(`/event/${eventPosted}`)
    })
    .catch(e=>{
      console.log(e)
      next();
    })
});


//CRUD --- Event profile
eventRoutes.get("/:id", ensureLoggedIn('/auth/login'), (req, res, next) => {
  let eventId = req.params.id;
  if (isInEvent(eventId, req.user)) {
    Events.findById(eventId).then(event => {
      const date = event.date.toDateString();
      User.find({"events": eventId}).then(users => {
        Post.find({"eventPosted": eventId}).populate("userPosting").then((posts)=>{
          res.render("event/dashboard", {event, users, posts, date} );
        })
      })
  })
}
  else {
    res.redirect("/")
  }
  
});



module.exports = eventRoutes;