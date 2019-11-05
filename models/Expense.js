const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const ExpenseSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  frequency: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Expense", ExpenseSchema);