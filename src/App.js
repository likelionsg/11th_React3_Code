import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Slogan from "./components/Slogan";
import { Main, MediaDiv } from "./styledComponents";

const App = () => {
  return (
    <>
      {/* Global Styling */}
      <MediaDiv>
        {/* Header */}
        <Header />
        <Main>
          {/* Slogan */}
          <Slogan />
          {/* Routes */}
        </Main>
      </MediaDiv>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default App;
