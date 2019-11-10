const express = require("express");
const passport = require("passport");
const User = require("../../models/User");
const Expense = require("../../models/Expense");
const Income = require("../../models/Income");
const StudentLoans = require("../../models/StudentLoans");
require("../../config/passport")(passport);

module.exports = function(app) {
  
  ///////////////////////////////
  // get expenses
  app.get(
    "/api/expenses/:id",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      let token = getToken(req.headers);
      if (token) {
        User.findById(req.params.id)
          .populate("expenses")
          .then(function(dbUser) {
            console.log({dbUser})
            // If able to successfully find and associate all Users and Notes, send them back to the client
            res.json(dbUser.expenses);
          })
          .catch(function(err) {
            // If an error occurs, send it back to the client
            console.log({ err });
            res.json(err);
          });
      } else {
        return res.status(403).send({ success: false, msg: "Unauthorized." });
      }
    }
  );
  ///////////////////////////////
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
        }).then(function(dbExpense) {
          User.update(
            {
              _id: req.body.id
            },
            { $push: { expenses: dbExpense._id } },
            { new: true }
          )
            .then(function(dbUser) {
              // If the User was updated successfully, send it back to the client
              //console.log('1',req.body.id)
              User.findById(req.body.id)
                .populate("expenses")
                .then(function(dbUser) {
                  // If able to successfully find and associate all Users and Notes, send them back to the client
                  //console.log('1', dbUser)
                  res.json(dbUser.expenses);
                })
                .catch(function(err) {
                  // If an error occurs, send it back to the client
                  console.log({ err });
                  res.json(err);
                });
            })
            .catch(function(err) {
              // If an error occurs, send it back to the client
              console.log("2", { err });
              res.json(err);
            });
        });
        // return res.status(200).send({ success: true, msg: "" });
      } else {
        return res.status(403).send({ success: false, msg: "Unauthorized." });
      }
    }
  );
  ///////////////////////////////

  //////////////////////////////
  // get incomes
  app.get(
    "/api/incomes/:id",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      let token = getToken(req.headers);
      if (token) {
        User.findById(req.params.id)
          .populate("incomes")
          .then(function(dbUser) {
            // If able to successfully find and associate all Users and Notes, send them back to the client
            res.json(dbUser.incomes);
          })
          .catch(function(err) {
            // If an error occurs, send it back to the client
            console.log({ err });
            res.json(err);
          });
      } else {
        return res.status(403).send({ success: false, msg: "Unauthorized." });
      }
    }
  );
  /////////////////////////////
  // save incomes
  app.post(
    "/api/incomes",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      let token = getToken(req.headers);
      if (token) {
        Income.create({
          name: req.body.name,
          frequency: req.body.frequency,
          value: req.body.value
        }).then(function(dbIncome) {
          console.log(dbIncome._id);
          User.update(
            {
              _id: req.body.id
            },
            { $push: { incomes: dbIncome._id } },
            { new: true }
          )
            .then(function(dbUser) {
              // If the User was updated successfully, send it back to the client
              console.log('2',req.body.id)
              User.findById(req.body.id)
                .populate("incomes")
                .then(function(dbUser) {
                  // If able to successfully find and associate all Users and Notes, send them back to the client
                  res.json(dbUser.incomes);
                })
                .catch(function(err) {
                  // If an error occurs, send it back to the client
                  console.log({ err });
                  res.json(err);
                });
            })
            .catch(function(err) {
              // If an error occurs, send it back to the client
              console.log("2", { err });
              res.json(err);
            });
        });
        // return res.status(200).send({ success: true, msg: "" });
      } else {
        return res.status(403).send({ success: false, msg: "Unauthorized." });
      }
    }
  );
  /////////////////////////////

  ////////////////////////////
  // get student loans
  app.get(
    "/api/studentLoans/:id",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      let token = getToken(req.headers);
      if (token) {
        User.findById(req.params.id)
          .populate("studentLoans")
          .then(function(dbUser) {
            // If able to successfully find and associate all Users and Notes, send them back to the client
            res.json(dbUser.studentLoans);
          })
          .catch(function(err) {
            // If an error occurs, send it back to the client
            console.log({ err });
            res.json(err);
          });
      } else {
        return res.status(403).send({ success: false, msg: "Unauthorized." });
      }
    }
  );
  ///////////////////////////
  // save student loans
  app.post(
    "/api/studentLoans",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      let token = getToken(req.headers);
      if (token) {
        StudentLoans.create({
          name: req.body.name,
          interest: req.body.interest,
          value: req.body.value
        }).then(function(dbStudentLoan) {
          console.log(dbStudentLoan._id);
          User.update(
            {
              _id: req.body.id
            },
            { $push: { studentLoans: dbStudentLoan._id } },
            { new: true }
          )
            .then(function(dbUser) {
              // If the User was updated successfully, send it back to the client
              console.log('3',{dbUser})
              User.findById(req.body.id)
                .populate("studentLoans")
                .then(function(dbUser) {
                  // If able to successfully find and associate all Users and Notes, send them back to the client
                  res.json(dbUser.studentLoans);
                })
                .catch(function(err) {
                  // If an error occurs, send it back to the client
                  console.log({ err });
                  res.json(err);
                });
            })
            .catch(function(err) {
              // If an error occurs, send it back to the client
              console.log("2", { err });
              res.json(err);
            });
        });
        // return res.status(200).send({ success: true, msg: "" });
      } else {
        return res.status(403).send({ success: false, msg: "Unauthorized." });
      }
    }
  );
  //////////////////////////////////

  //////////////////////////////////
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
  //////////////////////////////////
};
