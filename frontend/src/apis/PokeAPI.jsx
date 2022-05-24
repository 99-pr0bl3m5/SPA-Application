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

  static addPokemon = async (token, payload) => {
    try {
      // console.log("p", payload);
      const result = await axios.post(
        "http://localhost:5001/api/pokemon",
        payload,
        {
          headers: { token: token },
        }
      );

      // console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  };

  static getAllPoke = async (token) => {
    try {
      const result = await axios({
        method: "GET",
        url: "http://localhost:5001/api/pokemon",
        headers: { token: token },
      });
      return result.data.resMessage;
    } catch (error) {
      console.log(error.message);
    }
  };
}

export default PokeAPI;
