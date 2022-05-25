import React, { useEffect, useState } from "react";
import { Box, Container, Link, Typography } from "@mui/material";

function HomePage() {
  return (
    <Container>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
      <Link href="/home">Home</Link>
      <Link href="/Profile">Profile</Link>
    </Container>
  );
}

export default HomePage;
