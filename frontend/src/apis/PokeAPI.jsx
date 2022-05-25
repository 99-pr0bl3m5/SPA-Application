import axios from "axios";
import pokeJson from "../assets/Pokemon.json";

class PokeAPI {
  static getPoke = async (pokeNumber) => {
    try {
      console.log(`Getting to : ${pokeJson.results[pokeNumber].url}`);
      const result = await axios.get(pokeJson.results[pokeNumber].url);
      return result.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  static addPokemon = async (token, payload) => {
    try {
      console.log(`Posting to : ${axios.defaults.baseURL}/api/pokemon`);
      const result = await axios.post("api/pokemon", payload, {
        headers: { token: token },
      });

      // console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  };

  static getAllPoke = async (token) => {
    try {
      console.log(`Getting to : ${axios.defaults.baseURL}/api/pokemon`);
      const result = await axios({
        method: "GET",
        url: "api/pokemon",
        headers: { token: token },
      });
      return result.data.resMessage;
    } catch (error) {
      console.log(error.message);
    }
  };
}

export default PokeAPI;
