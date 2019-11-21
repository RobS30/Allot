const express = require("express");
const passport = require("passport");
const User = require("../../models/User");
const Expense = require("../../models/Expense");
const Income = require("../../models/Income");
const StudentLoans = require("../../models/Studentloans.js");
require("../../config/passport")(passport);
const Mortgage = require("../../client/src/components/GraphComponents/amort_time_series/loanamortization/mortgage");

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
            //console.log("22", dbUser.expenses);
            // If able to successfully find and associate all Users and Notes, send them back to the client
            res.json(dbUser.expenses);
          })
          .catch(function(err) {
            // If an error occurs, send it back to the client
            //console.log("29", { err });
            res.json(err);
          });
      } else {
        return res.status(403).send({ success: false, msg: "Unauthorized." });
      }
    }
  );
  ////////////////////////
  // get chart
  app.get(
    "/api/expensechart/:id",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      let token = getToken(req.headers);
      if (token) {
        User.findById(req.params.id)
          .populate("expenses")
          .then(function(dbUser) {
            //console.log("48", dbUser.expenses);
            // If able to successfully find and associate all Users and Notes, send them back to the client
            let temp = [["Expense", "%"]];
            let totalExpenses = 0;
            for (let i = 0; i < dbUser.expenses.length; i++) {
              totalExpenses += dbUser.expenses[i].value;
            }
            if (totalExpenses > 0) {
              let expenseList = dbUser.expenses.map(function(expense) {
                return [
                  expense.name,
                  ((expense.value / totalExpenses) * 100).toFixed(2)
                ];
              });
              temp.push(expenseList);
              res.json(temp);
            } else {
              res.json([]);
            }
          })
          .catch(function(err) {
            // If an error occurs, send it back to the client
            //console.log("29", { err });
            res.json(err);
          });
      } else {
        return res.status(403).send({ success: false, msg: "Unauthorized." });
      }
    }
  );
  ///////////////////////////////
  // get cashflow
  app.get(
    "/api/cashflow/:id",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      let token = getToken(req.headers);
      if (token) {
        User.findById(req.params.id)
          .populate("expenses incomes")
          .then(function(dbUser) {
            // get current month
            let m = new Date().getMonth();
            // get monthly expenses
            const monthlyExpenses = dbUser.expenses.filter(
              expense => expense.frequency === "monthly"
            );
            const totalMonthlyExpense = getTotals(monthlyExpenses);
            const biMonthlyExpenses = dbUser.expenses.filter(
              expense => expense.frequency === "bi-monthly"
            );
            const totalBiMonthlyExpense = getTotals(biMonthlyExpenses);
            const annualExpenses = dbUser.expenses.filter(
              expense => expense.frequency === "annual"
            );
            const totalAnnualExpenses = getTotals(annualExpenses);
            const semiAnnualExpenses = dbUser.expenses.filter(
              expense => expense.frequency === "semi-annual"
            );
            const totalSemiAnnualExpense = getTotals(semiAnnualExpenses);

            // get monthly income
            const monthlyIncomes = dbUser.incomes.filter(
              income => income.frequency === "monthly"
            );
            const totalMonthlyIncome = getTotals(monthlyIncomes);
            const biMonthlyIncomes = dbUser.incomes.filter(
              income => income.frequency === "bi-monthly"
            );
            const totalBiMonthlyIncome = getTotals(biMonthlyIncomes);
            const annualIncomes = dbUser.incomes.filter(
              income => income.frequency === "annual"
            );
            const totalAnnualIncome = getTotals(annualIncomes);
            const semiAnnualIncomes = dbUser.incomes.filter(
              income => income.frequency === "semi-annual"
            );
            const totalSemiAnnualIncome = getTotals(semiAnnualIncomes);

            let result = [];
            if (
              totalMonthlyExpense === 0 &&
              totalBiMonthlyExpense === 0 &&
              totalAnnualExpenses === 0 &&
              totalSemiAnnualExpense === 0 &&
              totalMonthlyIncome === 0 &&
              totalBiMonthlyIncome === 0 &&
              totalAnnualIncome === 0 &&
              totalSemiAnnualIncome === 0
            ) {
            } else {

              let index = 1;
              for (let i = m; i < m + 12; i++) {
                let temp = [];
                switch (index) {
                  case 1: {
                    temp.push(getMonth(i));
                    temp.push(totalMonthlyIncome);
                    temp.push(totalMonthlyExpense);
                    break;
                  }
                  default: {
                    switch (index) {
                      // semi annual
                      case 6: {
                        temp.push(getMonth(i));
                        temp.push(
                          totalMonthlyIncome +
                            totalBiMonthlyIncome +
                            totalSemiAnnualIncome
                        );
                        temp.push(
                          totalMonthlyExpense +
                            totalBiMonthlyExpense +
                            totalSemiAnnualExpense
                        );
                        break;
                      }
                      // annual
                      case 12: {
                        temp.push(getMonth(i));
                        temp.push(
                          totalMonthlyIncome +
                            totalBiMonthlyIncome +
                            totalSemiAnnualIncome +
                            totalAnnualIncome
                        );
                        temp.push(
                          totalMonthlyExpense +
                            totalBiMonthlyExpense +
                            totalSemiAnnualExpense +
                            totalAnnualExpenses
                        );
                        break;
                      }
                      default: {
                        if (index % 2 == 0) {
                          // monthly + bi-monthly
                          temp.push(getMonth(i));
                          temp.push(totalMonthlyIncome + totalBiMonthlyIncome);
                          temp.push(totalMonthlyExpense + totalBiMonthlyExpense);
                        } else {
                          // just monthly
                          temp.push(getMonth(i));
                          temp.push(totalMonthlyIncome);
                          temp.push(totalMonthlyExpense);
                        }
                        break;
                      }
                    }
                  }
                }
                index++;
                result.push(temp);
              }
            }

            res.json(result);
          })
          .catch(function(err) {
            // If an error occurs, send it back to the client
            //console.log("29", { err });
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
              User.findById(req.body.id)
                .populate("expenses")
                .then(function(dbUser) {
                  // If able to successfully find and associate all Users and Notes, send them back to the client
                  res.json(dbUser.expenses);
                })
                .catch(function(err) {
                  // If an error occurs, send it back to the client
                  //console.log("68", { err });
                  res.json(err);
                });
            })
            .catch(function(err) {
              // If an error occurs, send it back to the client
              //console.log("74", { err });
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
  // delete expense
  app.delete(
    "/api/expenses/:id",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      // console.log(
      //   "delete expese " + req.body.expense_id + " for user id " + req.params.id
      //);
      let token = getToken(req.headers);
      if (token) {
        Expense.findByIdAndRemove(
          { _id: req.body.expense_id },
          (err, dbExpenses) => {
            //console.log("removed expense:", dbExpenses);
            User.findOneAndUpdate(
              { _id: req.params.id },
              { $pull: { expenses: req.body.expense_id } },
              (err, dbUser) => {
                if (err) throw err;
                User.findById(dbUser._id)
                  .populate("expenses")
                  .then(function(dbUser) {
                    //console.log("22", dbUser.expenses);
                    // If able to successfully find and associate all Users and Notes, send them back to the client
                    res.json(dbUser.expenses);
                  })
                  .catch(function(err) {
                    // If an error occurs, send it back to the client
                    //console.log("29", { err });
                    res.json(err);
                  });
              }
            ).catch(function(err) {
              // If an error occurs, send it back to the client
              //console.log("142", err);
              res.json(err);
            });
          }
        );

      } else {
        return res.status(403).send({ success: false, msg: "Unauthorized." });
      }
    }
  );
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
            res.json(dbUser.incomes);
          })
          .catch(function(err) {
            // If an error occurs, send it back to the client
            //console.log("142", err);
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
          //console.log("123", dbIncome._id);
          User.update(
            {
              _id: req.body.id
            },
            { $push: { incomes: dbIncome._id } },
            { new: true }
          )
            .then(function(dbUser) {
              // If the User was updated successfully, send it back to the client
              //console.log("133", req.body.id);
              User.findById(req.body.id)
                .populate("incomes")
                .then(function(dbUser) {
                  // If able to successfully find and associate all Users and Notes, send them back to the client
                  res.json(dbUser.incomes);
                })
                .catch(function(err) {
                  // If an error occurs, send it back to the client
                  //console.log("142", err);
                  res.json(err);
                });
            })
            .catch(function(err) {
              // If an error occurs, send it back to the client
              //console.log("148", { err });
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
  // delete income
  app.delete(
    "/api/incomes/:id",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      // console.log(
      //   "delete income " + req.body.income_id + " for user id " + req.params.id
      //);
      let token = getToken(req.headers);
      if (token) {
        Income.findByIdAndRemove(
          { _id: req.body.income_id },
          (err, dbIncomes) => {
            //console.log("removed income:", dbIncomes);
          }
        );

        User.findOneAndUpdate(
          { _id: req.params.id },
          { $pull: { incomes: req.body.income_id } },
          (err, dbUser) => {
            if (err) throw err;
            User.findById(dbUser._id)
              .populate("incomes")
              .then(function(dbUser) {
                // If able to successfully find and associate all Users and Notes, send them back to the client
                res.json(dbUser.incomes);
              })
              .catch(function(err) {
                // If an error occurs, send it back to the client
                //console.log("29", { err });
                res.json(err);
              });
          }
        ).catch(function(err) {
          // If an error occurs, send it back to the client
          //console.log("142", err);
          res.json(err);
        });
      } else {
        return res.status(403).send({ success: false, msg: "Unauthorized." });
      }
    }
  );
  //////////////////////////////
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
            //console.log("176", { err });
            res.json(err);
          });
      } else {
        return res.status(403).send({ success: false, msg: "Unauthorized." });
      }
    }
  );
  ///////////////////////////
  app.get(
    "/api/studentLoansChart/:id",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      let token = getToken(req.headers);
      if (token) {
        User.findById(req.params.id)
          .populate("studentLoans")
          .then(function(dbUser) {
            // If able to successfully find and associate all Users and Notes, send them back to the client
            let bigTable = [];
            for (let i = 0; i < dbUser.studentLoans.length; i++) {
              bigTable.push(dbUser.studentLoans[i].amortization);
            }
            let temp1 = ["Month"];
            for (let i = 0; i < dbUser.studentLoans.length; i++) {
              temp1.push(dbUser.studentLoans[i].name);
            }
            let temp2 = [];
            temp2.push(temp1);
            //console.log(temp2)
            for (let i = 1; i < bigTable[0].length; i++) {
              let temp = [];
              temp.push(i);
              for (let j = 0; j < bigTable.length; j++) {
                temp.push(bigTable[j][i][5]);
              }
              //console.log(temp)
              temp2.push(temp);
            }
            console.log("temp2", temp2.length);
            res.json(temp2);
          })
          .catch(function(err) {
            // If an error occurs, send it back to the client
            //console.log("176", { err });
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
        let data = amort(req.body.value, req.body.interest, 20);
        StudentLoans.create({
          name: req.body.name,
          interest: req.body.interest,
          value: req.body.value,
          amortization: data
        }).then(function(dbStudentLoan) {
          User.update(
            {
              _id: req.body.id
            },
            { $push: { studentLoans: dbStudentLoan._id } },
            { new: true }
          )
            .then(function(dbUser) {
              User.findById(req.body.id)
                .populate("studentLoans")
                .then(function(dbUser) {
                  // If able to successfully find and associate all Users and Notes, send them back to the client
                  res.json(dbUser.studentLoans);
                })
                .catch(function(err) {
                  // If an error occurs, send it back to the client
                  //console.log("68", { err });
                  res.json(err);
                });
            })
            .catch(function(err) {
              // If an error occurs, send it back to the client
              //console.log("216", { err });
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
  // delete studentLoans
  app.delete(
    "/api/studentLoans/:id",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      // console.log(
      //   "delete studentLoan " +
      //     req.body.studentLoan_id +
      //     " for user id " +
      //     req.params.id
      //);
      let token = getToken(req.headers);
      if (token) {
        StudentLoans.findByIdAndRemove(
          { _id: req.body.studentLoan_id },
          (err, dbStudentLoans) => {
            console.log("removed studentLoan:", dbStudentLoans);
          }
        );

        User.findOneAndUpdate(
          { _id: req.params.id },
          { $pull: { studentLoans: req.body.studentLoan_id } },
          (err, dbUser) => {
            if (err) throw err;
            User.findById(dbUser._id)
              .populate("studentLoans")
              .then(function(dbUser) {
                // If able to successfully find and associate all Users and Notes, send them back to the client
                res.json(dbUser.studentLoans);
              })
              .catch(function(err) {
                // If an error occurs, send it back to the client
                //console.log("29", { err });
                res.json(err);
              });
          }
        ).catch(function(err) {
          // If an error occurs, send it back to the client
          //console.log("142", err);
          res.json(err);
        });
      } else {
        return res.status(403).send({ success: false, msg: "Unauthorized." });
      }
    }
  );
  //////////////////////////////
  //////////////////////////////////
  // get net worth
  app.get(
    "/api/networth/:id",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      let token = getToken(req.headers);
      if (token) {
        User.findById(req.params.id)
          .populate("expenses incomes studentLoans")
          .then(function(dbUser) {
            let networth = 0;
            let totalExpenses = 0;
            for (let i = 0; i < dbUser.expenses.length; i++) {
              totalExpenses += dbUser.expenses[i].value;
            }
            let totalIncome = 0;
            for (let i = 0; i < dbUser.incomes.length; i++) {
              totalIncome += dbUser.incomes[i].value;
            }
            let totalLoans = 0;
            for (let i = 0; i < dbUser.studentLoans.length; i++) {
              totalLoans += dbUser.studentLoans[i].value;
            }
            let totalInterest = 0;
            for (let i = 0; i < dbUser.studentLoans.length; i++) {
              let len = dbUser.studentLoans[i].amortization.length;
              totalInterest += dbUser.studentLoans[i].amortization[len - 1][4];
            }
            totalLoans = totalLoans.toFixed(2);
            totalInterest = totalInterest.toFixed(2);
            networth = (totalIncome - totalLoans).toFixed(2);
            let obj = {
              networth,
              totalIncome,
              totalExpenses,
              totalInterest
            };
            res.json(obj);
          })
          .catch(function(err) {
            // If an error occurs, send it back to the client
            //console.log("262", { err });
            res.json(err);
          });
      } else {
        return res.status(403).send({ success: false, msg: "Unauthorized." });
      }
    }
  );
  //////////////////////////////////

  getTotals = function(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i].value;
    }
    return sum;
  };
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
  function amort(amount, interest, years) {
    let afterMonths = 6;
    if (interest > 1) {
      interest = interest / 100;
    }
    let mortgage = new Mortgage(amount, interest, years);
    let payment = mortgage.fixedMonthlyPayment();
    let remaining = mortgage.remainingLoanBalance(afterMonths);
    let amortTable = mortgage.amortizationTable();
    let amortList = amortTable.map(function(row, i) {
      return [i, row[0], row[1], row[2], row[3], row[4]];
    });
    //console.log("Fixed monthly payments: " + payment);
    // console.log(
    //   "Remaining balance after " + afterMonths + " months: " + remaining
    // );
    let temp = [["Month", "Balance"]];
    amortList.forEach(Element => {
      temp.push(Element);
    });
    //console.log("Amortization table:");

    return temp;
  }

  //////////////////////////////////
  function getMonth(m) {
    if (m < 0) {
      m = 0;
    }
    if (m >= 12) {
      m = m - 12;
    }
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];

    return months[m];
  }
};
