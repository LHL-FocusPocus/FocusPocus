import React from "react";
import Landing from "./components/Landing";
import LogoText from "./components/LogoText";
import styled from "styled-components";

import "./App.css";

const Container = styled.div`
  display: flex;
  align-items: flex-end;
`

function App() {
  return (
    <div className="App">
      <Container>
        <LogoText />
        <Landing />
      </Container>
    </div>
  );
}

export default App;
