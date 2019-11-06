const passport = require("passport");
require("../../config/passport")(passport);
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
require("dotenv").config();

module.exports = function(app) {

  // register new user
  app.post("/api/register", function(req, res) {
    console.log(req.body);
    if (!req.body.email || !req.body.password) {
      res.json({ success: false, msg: "Please pass email and password." });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        college: req.body.college
      });
      // save the user
      newUser.save(function(err) {
        if (err) {
          return res.json({ success: false, msg: "Email already exists." });
        }
        res.json({ success: true, msg: "Successful created new user." });
      });
    }
  });
  
  // login
  app.post("/api/login", function(req, res) {
    User.findOne(
      {
        email: req.body.email
      },
      function(err, user) {
        if (err) throw err;
  
        if (!user) {
          res.status(401).send({
            success: false,
            msg: "Authentication failed. User not found."
          });
        } else {
          // check if password matches
          user.comparePassword(req.body.password, function(err, isMatch) {
            if (isMatch && !err) {
              // if user is found and password is right create a token
              let token = jwt.sign(user.toJSON(), process.env.APP_SECRET);
              // return the information including token as JSON
              let newUser = {
                name: user.name,
                college: user.college,
                email: user.email
              }
              res.json({ success: true, token: "JWT " + token , user: newUser});
            } else {
              res.status(401).send({
                success: false,
                msg: "Authentication failed. Wrong password."
              });
            }
          });
        }
      }
    );
  });
}
