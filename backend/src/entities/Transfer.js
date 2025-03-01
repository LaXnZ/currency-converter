const mongoose = require("mongoose");

const transferSchema = new mongoose.Schema({
  fromCountry: String,
  toCountry: String,
  amount: Number,
  convertedAmount: Number,
  rate: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transfer", transferSchema);
