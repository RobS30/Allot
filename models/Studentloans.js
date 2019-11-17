const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const StudentLoanSchema = new Schema({
  name: {
    type: String,
    unique: false,
    required: true
  },  
  value: {
    type: Number,
    required: true
  },
  interest: {
    type: Number,
    required: true
  },
  amortization: {
    type: Array
  }
});

module.exports = mongoose.model("StudentLoan", StudentLoanSchema);