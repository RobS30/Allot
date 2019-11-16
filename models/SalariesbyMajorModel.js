const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SalariesbyMajorSchema = new Schema({

  Occupational_Code: {
    type: String,
    unique: true,
    required: true
  },  
  Job_Title: {
    type: String,
    required: true
  },
  OCC_GROUP: {
    type: String,
    required: true
  },
  Total_Employment: {
    type: String,
    required: true
  },
  Growth_Rate: {
    type: Number,
    required: true
  },
  Mean_Hourly_Wage: {
    type: Number,
    required: true
  },
  Mean_Annual_Salary: {
    type: String,
    required: true
  },
  A_PCT10: {
    type: String,
    required: true
  },
  A_PCT25: {
    type: String,
    required: true
  },
  A_MEDIAN: {
    type: String,
    required: true
  },
  A_PCT75: {
    type: String,
    required: true
  },
  A_PCT90: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("SalariesbyMajor", SalariesbyMajorSchema);