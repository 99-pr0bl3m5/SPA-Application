import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import ResponsiveAppBar from "../component/ResponsiveAppBar";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import PokeAPI from "../apis/PokeAPI";
import PokemonCard from "../component/PokemonCard";
import { userContext } from "../context/useUser";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

const getAllPoke = async (token) => {
  try {
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

async function getPokemon(pokeNumber, count) {
  const data = await PokeAPI.getPoke(pokeNumber);
  let allType = [];

  if (data?.name) {
    if (!data?.types) allType = ["normal"];
    else {
      for (const element of data.types) {
        allType.push(element.type.name);
      }
    }
    // console.log("POKE:", data);
    const pokemon = {
      name: data.name.toUpperCase(),
      species: data.species.name,
      img: data.sprites.front_default,
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      type: allType,
      count: count,
    };
    return pokemon;
  }
  return;
}

function Profile() {
  const [didFetch, setDidFetch] = useState(false);
  const [allOfPokemon, setAllOfPokemon] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const { currentUser } = useContext(userContext);
  const [mockData, setMockData] = useState([
    {
      name: "3",
      count: 1,
    },
    {
      name: "1",
      count: 1,
    },
    {
      name: "5",
      count: 2,
    },
    {
      name: "45",
      count: 1,
    },
    {
      name: "12",
      count: 1,
    },
    {
      name: "15",
      count: 2,
    },
  ]);

  useEffect(() => {
    // console.log("update useEffect in profile");

    const func = async () => {
      // console.log("USER kuy", currentUser);
      if (!currentUser.token) return;
      const res = await getAllPoke(currentUser.token);
      // console.log("getAllPoke", res);
      setAllOfPokemon(res);
      // setAllOfPokemon(mockData);
    };

    func();
  }, [currentUser]);

  useEffect(() => {
    // console.log(allOfPokemon);
    const fetchPokemonData = async () => {
      const arr = [];
      for (const n of allOfPokemon) {
        if (n.name) {
          const pokemon = await getPokemon(parseInt(n.name), n.count);
          arr.push(pokemon);
        }
      }
      setPokemonData(arr);
    };

    fetchPokemonData();
    setDidFetch(true);
  }, [allOfPokemon]);

  return (
    <Box>
      <ResponsiveAppBar currentUser={currentUser} />
      <Box
        sx={{
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        {didFetch ? (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              margin: "3% 10% 3% 10%",
            }}
          >
            {pokemonData
              .filter((el) => !!el)
              .map((currentPokemon, idx) => (
                <PokemonCard key={idx} poke={currentPokemon} />
              ))}
          </Box>
        ) : (
          <Container
            sx={{ display: "flex", alignSelf: "center", margin: "3%" }}
          >
            <CircularProgress />
          </Container>
        )}
      </Box>
    </Box>
  );
}

export default Profile;
