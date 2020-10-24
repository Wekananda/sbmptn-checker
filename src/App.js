import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { ThemeProvider } from "@chakra-ui/core";
import Konten from "./konten";
import FirebaseProvider from "./FirebaseProvider";

import "./App.css";
import MyCarouselWithDots from "./MyCaraouselWithDocs";

function App() {
  return (
    <ThemeProvider>
      <FirebaseProvider>
        <MyCarouselWithDots />
        <Konten />
      </FirebaseProvider>
    </ThemeProvider>
  );
}

export default App;
