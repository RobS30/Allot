const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

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
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Expense", ExpenseSchema);