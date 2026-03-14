const mongoose = require("mongoose");

const emiPlanSchema = new mongoose.Schema({

  months: Number,

  interestRate: Number,

  cashback: {
    type: Number,
    default: 0
  }

});

module.exports = mongoose.model("EmiPlan", emiPlanSchema);