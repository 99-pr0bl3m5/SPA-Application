import React, { useContext, useEffect, useState, useCallback } from "react";
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

async function getPokemon(pokeNumber) {
  const data = await PokeAPI.getPoke(pokeNumber);
  let allType = [];

  for (const element of data.types) {
    allType.push(element.type.name);
  }

  const pokemon = {
    name: data.name.toUpperCase(),
    species: data.species.name,
    img: data.sprites.front_default,
    hp: data.stats[0].base_stat,
    attack: data.stats[1].base_stat,
    defense: data.stats[2].base_stat,
    type: allType,
  };
  return pokemon;
}

export default function RandomPage() {
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

  const { currentUser, setCurrentUser } = useContext(userContext);
  const [isRotate, setIsRotate] = useState(false);

  useEffect(() => {
    if (isSelected) {
      const myTimeout = setTimeout(() => {
        if (isSelected) setIsSelected(false);
      }, 60000);
    }
  }, [isSelected]);

  const handleClick = async () => {
    setIsRotate(true);
    setIsSelected(false);
    await new Promise((resolve) =>
      setTimeout(() => {
        setIsRotate(false);
        resolve();
      }, [1000])
    );
    await randomPokemon();
  };

  const randomPokemon = useCallback(async () => {
    const pokeNumber = Math.floor(Math.random() * 1125);

    try {
      await PokeAPI.addPokemon(currentUser.token, {
        name: pokeNumber.toString(),
      });
    } catch (e) {
      throw new Error("kuy error");
    }

    const pokemon = await getPokemon(pokeNumber);

    setCurrentPokemon(pokemon);
    setIsSelected(true);
  }, [currentUser]);

  return (
    <Box>
      <ResponsiveAppBar currentUser={currentUser} />

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
          <Box className={isRotate && "App-logo"} mt="15vh">
            <CatchingPokemonIcon
              sx={{
                color: "#F71B1B",
                fontSize: "15vw",
              }}
            />
          </Box>
        )}
        <Button variant="outlined" onClick={async () => await handleClick()}>
          Catch
        </Button>
      </Container>
    </Box>
  );
}
