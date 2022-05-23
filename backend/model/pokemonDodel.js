const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema({
  ownerId: String,
  name: String,
  count: Number,
});

const pokemon = mongoose.model("pokemon", pokemonSchema);

module.exports = pokemon;
