const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const StudentLoanSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },  
  value: {
    type: Number,
    required: true
  },
  interest: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("StudentLoan", StudentLoanSchema);