const express = require("express");
const passport = require("passport");
const User = require("../../models/User");
const Expense = require("../../models/Expense");
const Income = require("../../models/Income");
const StudentLoans = require("../../models/StudentLoans");
require("../../config/passport")(passport);

module.exports = function(app) {
  // get user budget
  app.get(
    "/api/budget",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      var token = getToken(req.headers);
      if (token) {
        Expense.find(function(err, dbExpenses) {
          if (err) return next(err);
          res.json(dbExpenses);
        });
      } else {
        return res.status(403).send({ success: false, msg: "Unauthorized." });
      }
    }
  );

  // save expenses
  app.post(
    "/api/expenses",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      let token = getToken(req.headers);
      if (token) {

        Expense.create({
          name: req.body.name,
          category: req.body.category,
          value: req.body.value,
          frequency: req.body.frequency
        })
          .then(function(dbExpense) {
            console.log('dbExpense', dbExpense)
            return User.findOneAndUpdate(
              {
                email: req.body.email
              },
              { $push: { expenses: dbExpense._id } },
              { new: true }
            );
          })
          .then(function(dbUser) {
            //console.log('dbUser', dbUser);
            // If the User was updated successfully, send it back to the client
            res.json(dbUser);
          })
          .catch(function(err) {
            // If an error occurs, send it back to the client
            res.json(err);
          });
        // return res.status(200).send({ success: true, msg: "" });
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
      let token = getToken(req.headers);
      if (token) {

        Income.create({
          name: req.body.name,
          category: req.body.category,
          value: req.body.value
        })
          .then(function(dbIncome) {
            console.log('dbIncome', dbIncome)
            return User.findOneAndUpdate(
              {
                email: req.body.email
              },
              { $push: { incomes: dbIncome._id } },
              { new: true }
            );
          })
          .then(function(dbUser) {
            //console.log('dbUser', dbUser);
            // If the User was updated successfully, send it back to the client
            res.json(dbUser);
          })
          .catch(function(err) {
            // If an error occurs, send it back to the client
            res.json(err);
          });
        // return res.status(200).send({ success: true, msg: "" });
      } else {
        return res.status(403).send({ success: false, msg: "Unauthorized." });
      }
    }
  );

  // save student loans
  app.post(
    "/api/studentLoans",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      let token = getToken(req.headers);
      if (token) {

        StudentLoans.create({
          name: req.body.name,
          interest: req.body.category,
          value: req.body.value
        })
          .then(function(dbStudentLoan) {
            console.log('dbStudentLoan', dbStudentLoan)
            return User.findOneAndUpdate(
              {
                email: req.body.email
              },
              { $push: { studentLoans: dbStudentLoan._id } },
              { new: true }
            );
          })
          .then(function(dbUser) {
            //console.log('dbUser', dbUser);
            // If the User was updated successfully, send it back to the client
            res.json(dbUser);
          })
          .catch(function(err) {
            // If an error occurs, send it back to the client
            res.json(err);
          });
        // return res.status(200).send({ success: true, msg: "" });
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
};
