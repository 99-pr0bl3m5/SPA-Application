import React, { useEffect, useState } from "react";
import { Box, Container, Link, Typography } from "@mui/material";
import { userContext, useUser, userProvider } from "../../context/useUser";

function HomePage() {
  const currency = useUser();

  return (
    <Container>
      <userProvider>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
        <Link href="/home">Home</Link>
      </userProvider>
    </Container>
  );
}

export default HomePage;
