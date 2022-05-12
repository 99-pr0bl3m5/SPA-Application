import React, { useEffect, useState } from "react";
import { Box, Container, Link, Typography } from "@mui/material";

function HomePage() {
  return (
    <Container>
      <Link href="/login">LOGIN</Link>
      <Link href="/register">Register</Link>
    </Container>
  );
}

export default HomePage;
