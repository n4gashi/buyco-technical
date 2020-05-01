import React from "react";
import { createGlobalStyle } from "styled-components";
import Users from "users";

const GlobalStyle = createGlobalStyle`
  body {
    padding:32px;
    color: #141414;
    font-family: 'IBM Plex Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #ddfdfd;
  }
`;

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Users />
    </div>
  );
}

export default App;
