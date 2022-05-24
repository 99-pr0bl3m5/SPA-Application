import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import SessionAPI from "../apis/SessionAPI";

const ResponsiveAppBar = ({ currentUser }) => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CatchingPokemonIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              cursor: "pointer",
            }}
            onClick={() => navigate("/home")}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PokeRan
          </Typography>

          <CatchingPokemonIcon
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              cursor: "pointer",
            }}
            onClick={() => navigate("/home")}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PokeRan
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
              cursor: "pointer",
            }}
            onClick={() => navigate("/profile")}
          >
            <Avatar alt={currentUser.name || "username"} />
            <Typography>{currentUser.name || "username"}</Typography>
          </Box>
          <Box>
            <LogoutIcon
              sx={{
                display: { xs: "none", md: "flex" },
                ml: 5,
                cursor: "pointer",
              }}
              onClick={async () => {
                console.log("logout");
                await SessionAPI.Logout(currentUser.token);
                localStorage.setItem("token", null);
                navigate("/login");
              }}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
