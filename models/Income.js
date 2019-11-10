const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const IncomeSchema = new Schema({
  name: {
    type: String,
    unique: true,
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

module.exports = mongoose.model("Income", IncomeSchema);