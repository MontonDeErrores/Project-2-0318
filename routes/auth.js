const express = require("express");
const passport = require('passport');
const authRoutes = express.Router();
const User = require("../models/User");
const Events = require("../models/Event");
const uploadCloud = require("../config/cloudinary.js");
const sendMail = require("../mail/sendMail");
//const ensureLoggedOut = require('../middlewares/ensureLoggedOut');
const ensureLoggedIn = require('../middlewares/ensureLoggedIn');
//const isAdmin = require('../middlewares/isAdmin');
//const isInEvent = require('../middlewares/isInEvent');

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

authRoutes.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

authRoutes.get("/signup", (req, res, next) => {
  const invitado = req.query.key;
  //console.log(invitado);
  res.render("auth/signup", {invitado});
});

authRoutes.post("/signup", uploadCloud.single("photo"), (req, res, next) => {
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const invitado = req.body.invitado;
  const username = req.body.username;
  const email = req.body.email;
  const gender = req.body.inputGroupSelect01;
  const password = req.body.password;
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


  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }
    if (invitado){
      var events = invitado;
    }
    const confirmationCode = bcrypt.hashSync(username, salt);
    const hashPass = bcrypt.hashSync(password, salt);
    const newUser = new User({
      username,
      email,
      gender,
      password: hashPass,
      photo,
      events
    });

    newUser.save((err) => {
      if (err) {
        console.log("Error save")
        res.render("auth/signup", { message: "Something went wrong" });
      } else {
        req.login(newUser, function(err) {
          if (!err) {
              res.redirect("/auth/profile");
          } else {
              res.render("error", err);
          }
      });
        const mensaje = `Bienvenido a Fiestit, donde podrás organizar todas tus fiestas.`
        sendMail(newUser.email, mensaje)
          .then(() => {
            res.redirect("/");
          })
      }
    });
  });
});

authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

authRoutes.get("/new", (req, res) => {
  req.logout();
  res.render("auth/new");
});


//CRUD --- Retreive profile
authRoutes.get("/profile", ensureLoggedIn('/auth/login'), (req, res) => {
  
  let id = req.user.id;
  User.findById(id)
    .populate('events')
    .then(eventAll => {
      if(eventAll){
      eventAll.events = eventAll.events.map(e=>{
        return e.fechaOK = e.date.toDateString()
      });}
      console.log(eventAll.events.fechaOk)
      res.render("auth/profile", {eventAll})
    })
});

//CRUD --- edit profile
authRoutes.post("/profile", [ensureLoggedIn('/auth/login'), uploadCloud.single("photo")] ,(req, res) => {
  const salt = bcrypt.genSaltSync(bcryptSalt);
  let id = req.user.id;
  const {username, email, password} = req.body;
  const hashPass = bcrypt.hashSync(password, salt);
  if (req.file){
    var photo = req.file.url;
    var editUser = {username, email, password: hashPass, photo};
  }
  else{
  var editUser = {username, email, password: hashPass};
  }

  User.findByIdAndUpdate(id, editUser)
  .then(() => {
    res.redirect(`/auth/profile/`);
  })
  .catch(error => {
    next();
  })
});



module.exports = authRoutes;
