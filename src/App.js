import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Slogan from "./components/Slogan";
import { Main, MediaDiv } from "./styledComponents";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

import Temp from "./Temp";
import ShowPostList from "./components/ShowPostList";
import ShowPost from "./components/ShowPost";
import WritePost from "./components/WritePost";

export const APIURL = process.env.REACT_APP_APIURL;

const App = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        {/* Global Styling */}
        <GlobalStyles />
        <MediaDiv>
          {/* Header */}
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            {/* Slogan */}
            <Slogan />

            <Temp />
            {/* Routes */}
            <Routes>
              <Route path="/" element={<ShowPostList />} />
              <Route path="/write" element={<WritePost />} />
              <Route path="/post/:postID" element={<ShowPost />} />
            </Routes>
          </Main>
        </MediaDiv>
        {/* Footer */}
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default App;
