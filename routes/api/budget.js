const express = require("express");
const passport = require("passport");
const Expense = require("../../models/Expense");
const Income = require("../../models/Income");
const StudentLoans = require("../../models/StudentLoans");
require("../../config/passport")(passport);

module.exports = function(app) {

  // get user budget
  app.get("/api/budget", passport.authenticate("jwt", { session: false }), function(
    req,
    res
  ) {
    var token = getToken(req.headers);
    if (token) {
      Expense.find(function(err, dbExpenses) {
        if (err) return next(err);
        res.json(dbExpenses);
      });
  
      
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  });
  
  // save expenses
  app.post(
    "/api/expenses",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      var token = getToken(req.headers);
      if (token) {
        Expense.create(req.body, function(err, post) {
          if (err) return next(err);
          res.json(post);
        });
      } else {
        return res.status(403).send({ success: false, msg: "Unauthorized." });
      }
    }
  );
  
  // save incomes
  app.post(
    "/api/incomes",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      var token = getToken(req.headers);
      if (token) {
        Income.create(req.body, function(err, post) {
          if (err) return next(err);
          res.json(post);
        });
      } else {
        return res.status(403).send({ success: false, msg: "Unauthorized." });
      }
    }
  );
  
  // save student loans
  app.post(
    "/api/student-loans",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      var token = getToken(req.headers);
      if (token) {
        StudentLoans.create(req.body, function(err, post) {
          if (err) return next(err);
          res.json(post);
        });
      } else {
        return res.status(403).send({ success: false, msg: "Unauthorized." });
      }
    }
  );
  
  getToken = function(headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(" ");
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };
}
