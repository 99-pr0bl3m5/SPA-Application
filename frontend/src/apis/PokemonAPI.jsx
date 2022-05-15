import { Component } from "react";
import axios from 'axios';

class PokemonAPI extends Component {
  
  static getPokemon = async () => {
    try {
      const result = await axios({
        method: "GET",
        url:"api/pokemon"
      });

      return result.data
    } catch (e) {
      console.log(e.message);
    }
  }
}

export default PokemonAPI;