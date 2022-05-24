import axios from "axios";
import pokeJson from "../assets/Pokemon.json";

class PokeAPI {
  static getPoke = async (pokeNumber) => {
    try {
      const result = await axios.get(pokeJson.results[pokeNumber].url);
      return result.data;
    } catch (error) {
      console.log(error.message);
    }
  };
}

export default PokeAPI;
