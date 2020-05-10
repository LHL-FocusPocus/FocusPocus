import React from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import LogoText from "./LogoText";
import styled from "styled-components";
import { Route, Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
`;

const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  width: 66vw;
`;

export default function Landing() {
  return (
    <Container>
      <InnerContainer>
        <LogoText />
      </InnerContainer>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={SignUp} />
    </Container>
  );
}
