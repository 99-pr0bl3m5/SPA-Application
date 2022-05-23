import React, { useEffect, useState } from "react";
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

export default function RandomPage() {
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  let myTimeout = "";

  useEffect(() => {
    if (isSelected) {
      myTimeout = setTimeout(() => {
        if (isSelected) setIsSelected(false);
      }, 60000);
    }
  }, [isSelected]);

  async function randomPokemon() {
    const pokeNumber = Math.floor(Math.random() * 1125);
    const data = await PokeAPI.getPoke(pokeNumber);
    let allType = [];

    data.types.forEach((element) => {
      console.log(element.type.name);
      allType.push(element.type.name);
    });

    console.log("PokeAPI", data, allType);

    clearTimeout(myTimeout);
    setCurrentPokemon({
      name: data.name.toUpperCase(),
      species: data.species.name,
      img: data.sprites.front_default,
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      type: allType,
    });
    setIsSelected(true);
  }

  return (
    <Box>
      <ResponsiveAppBar />

      <Container
        sx={{
          marginTop: "5vh",
          marginBottom: "10vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isSelected ? (
          <PokemonCard poke={currentPokemon} />
        ) : (
          <CatchingPokemonIcon
            sx={{
              marginTop: "15vh",
              color: "#F71B1B",
              fontSize: "15vw",
              marginBottom: 1,
            }}
          />
        )}
        <Button variant="outlined" onClick={() => randomPokemon()}>
          Catch
        </Button>
      </Container>
    </Box>
  );
}
