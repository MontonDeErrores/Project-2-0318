const express = require("express");
const passport = require('passport');
const authRoutes = express.Router();
const User = require("../models/User");
const Events = require("../models/Event");
const uploadCloud = require("../config/cloudinary.js");
const sendMail = require("../mail/sendMail");

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
  res.render("auth/signup");
});

authRoutes.post("/signup", uploadCloud.single("photo"), (req, res, next) => {
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const photo = req.file.url;


  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const newUser = new User({
      username,
      email,
      password: hashPass,
      photo
    });

    const confirmationCode = bcrypt.hashSync(username, salt);
    const hashPass = bcrypt.hashSync(password, salt);
    
    newUser.save((err) => {
      if (err) {
        console.log("Error save")
        res.render("auth/signup", { message: "Something went wrong" });
      } else {
        console.log(11)
        sendMail(newUser.email, newUser.confirmationCode)
          .then(() => {
            console.log("Console log en el authjs linea 60");
            console.log(confirmationCode)
            console.log(newUser.confirmationCode)
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


//CRUD --- Retreive
authRoutes.get("/profile/:id", (req, res) => {
  User.findById(req.params.id)
    .populate('events')
    .then(eventAll => {
      console.log(eventAll);
      res.render("auth/profile", { eventAll })
    })
});




module.exports = authRoutes;
