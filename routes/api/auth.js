const passport = require("passport");
require("../../config/passport")(passport);
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
require("dotenv").config();

module.exports = function(app) {
  // register new user
  app.post("/api/register", function(req, res) {
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
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("superSecret", salt, function(err, hash) {
          newUser.password = hash;
          newUser.save();
          res.json({ success: true, message: "Create user successful" });
        });
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
          bcrypt.compare(req.body.password, user.password, function(
            err,
            result
          ) {
            if (res) {
              let token = jwt.sign(user.toJSON(), process.env.APP_SECRET);
              // return the information including token as JSON
              let newUser = {
                name: user.name,
                college: user.college,
                id: user._id
              };
              res.json({ success: true, token: "JWT " + token, user: newUser });
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
};
