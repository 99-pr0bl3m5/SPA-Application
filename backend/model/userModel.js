const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  userName: String,
  password: String,
});

const user = mongoose.model("user", userSchema);

module.exports = user;
