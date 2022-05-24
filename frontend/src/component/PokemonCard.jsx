import React from "react";
import "./card.scss";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Container } from "@mui/material";
import { border, borderRadius } from "@mui/system";

const PokemonCard = ({ poke }) => {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    width: "60%",
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    },
  }));

  const colorOfType = {
    ghost: "#916693",
    grass: "#21CE4F",
    dark: "#5A587D",
    electric: "#E3E22E",
    bug: "#3C9950",
    fairy: "#DB1B67",
    water: "#85A8FC",
    flying: "#152630",
    normal: "#CA98A7",
    rock: "#5D2F1C",
    steel: "#42BE94",
    fire: "#8F1D1B",
    psychic: "#F91C96",
    ground: "#A47130",
    fighting: "#F36136",
    dragon: "#61CBDB",
    ice: "#D2F2FF",
    poison: "#B9ABC1",
  };

  return poke.name ? (
    <div style={{ position: "relative" }}>
      {poke.count ? (
        <Box
          sx={{
            position: "absolute",
            backgroundColor: "primary.main",
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            fontWeight: "bold",
            right: 0,
            top: 16,
            color: "white",
            zIndex: 1,
          }}
        >
          {poke.count}
        </Box>
      ) : (
        <></>
      )}
      <div className="contenedorCards">
        <div className="card">
          <div className="wrapper">
            <div
              className="colorProd"
              style={{
                backgroundColor: poke.type.length
                  ? colorOfType[poke.type[0]]
                  : "#CF9CAB",
              }}
            ></div>
            <div
              className="imgProd"
              style={{
                backgroundImage: poke.img
                  ? `url(${poke.img})`
                  : `url(https://www.svgrepo.com/show/126178/question-mark.svg)`,
              }}
            ></div>
            <div className="infoProd">
              <p className="nombreProd">{poke.name}</p>
              <p className="extraInfo">
                <strong>Species : </strong>
                {poke.species}
              </p>
              <p className="extraInfo">
                <strong>Type : </strong>{" "}
                {poke.type ? poke.type.join(" , ") : "can't define their type"}
              </p>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <p className="statusInfo">
                  <strong>HP : </strong> {poke.hp}
                </p>
                <BorderLinearProgress
                  variant="determinate"
                  value={(poke.hp / 300) * 100}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <p className="statusInfo">
                  <strong>Attack : </strong> {poke.attack}
                </p>
                <BorderLinearProgress
                  variant="determinate"
                  value={(poke.attack / 200) * 100}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <p className="statusInfo">
                  <strong>Defense : </strong> {poke.defense}
                </p>
                <BorderLinearProgress
                  variant="determinate"
                  value={(poke.defense / 700) * 100}
                />
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Container sx={{ display: "flex", alignSelf: "center", margin: "3%" }}>
      <CircularProgress />
    </Container>
  );
};

export default PokemonCard;
