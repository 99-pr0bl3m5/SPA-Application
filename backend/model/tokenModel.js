const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  tokenSting: String,
  userId: String,
});

const token = mongoose.model("token", tokenSchema);

module.exports = token;
