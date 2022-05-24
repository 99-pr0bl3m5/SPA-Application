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

function Profile() {
  return (
    <Box>
      <ResponsiveAppBar />
    </Box>
  );
}

export default Profile;
