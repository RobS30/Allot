const passport = require("passport");
require("../../config/passport")(passport);
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const SalariesByMajor = require("../../models/SalariesbyMajorModel");
require("dotenv").config();

module.exports = function (app) {
    app.get(
        "/api/salaries",
        passport.authenticate("jwt", { session: false }),
        function(req, res) {
          var token = getToken(req.headers);
          if (token) {
            SalariesByMajor.find(function(err, dbResults) {
              if (err) return next(err);
              let jobs = getList(dbResults);
              res.json(jobs);
            });
          } else {
            return res.status(403).send({ success: false, msg: "Unauthorized." });
          }
        }
      );

    function getList(data) {
        var jobs = [];
        data.forEach(element => {
            jobs.push({
                "job" : element.Job_Title,
                "salary" : element.Mean_Annual_Salary,
                "id" : element._id
            })
        })
        console.log(jobs)
        return jobs;
    };

    app.get(
        "/api/salaries/:id",
        passport.authenticate("jwt", { session: false }),
        function(req, res) {
          var token = getToken(req.headers);
          if (token) {
              SalariesByMajor.findById(req.params.id, function(err, dbResult) {
              if (err) return next(err);
              res.json(dbResult);
            });
          } else {
            return res.status(403).send({ success: false, msg: "Unauthorized." });
          }
        }
      );

}; 
