const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Expense = require("../../models/Expense");
const Income = require("../../models/Income");
const StudentLoans = require("../../models/StudentLoans");
require("../../config/passport")(passport);

// get user budget
router.get("/", passport.authenticate("jwt", { session: false }), function(
  req,
  res
) {
  var token = getToken(req.headers);
  if (token) {
    Expense.find(function(err, dbExpenses) {
      if (err) return next(err);
      res.json(dbExpenses);
    });

    Income.find(function(err, dbIncomes) {
      if (err) return next(err);
      res.json(dbIncomes);
    });

    StudentLoans.find(function(err, dbLoans) {
      if (err) return next(err);
      res.json(dbLoans);
    });
  } else {
    return res.status(403).send({ success: false, msg: "Unauthorized." });
  }
});

// save expenses
router.post(
  "/expenses",
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
router.post(
  "/incomes",
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
router.post(
  "/student-loans",
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

module.exports = router;
