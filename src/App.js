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

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  // const [id, setId] = useState("");

  // const changeId = (e) => {
  //   console.log(e.target.value);
  //   console.log(id.length);
  // };

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

            {/* <Temp /> */}
            {/* Routes */}
            <Routes>
              <Route path="/" element={<ShowPostList />} />
              <Route path="/write" element={<div>글 작성 페이지</div>} />
              <Route path="/post/:postID" element={<ShowPost />} />
            </Routes>
            {/* styled components 예시 */}

            {/* <Example active={email.length}>
              <Button>Hello</Button>
              <NewButton color="blue">Im new Button</NewButton>
            </Example> */}
          </Main>
        </MediaDiv>
        {/* Footer */}
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default App;

// const Example = styled.div`
//   background: ${({ active }) => {
//     if (active) {
//       return "white";
//     }
//     return "#eee";
//   }};
//   color: black;
// `;

// const Button = styled.button`
//   width: 200px;
//   padding: 30px;
// `;

// // Button 컴포넌트 상속
// const NewButton = styled.Button`
//   // NewButton 컴포넌트에 color가는 props가 있으면 그 값 사용, 없으면 'red' 사용
//   color: ${(props) => props.color || "red"};
// `;
