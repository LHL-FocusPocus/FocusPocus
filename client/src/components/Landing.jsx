import React from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import Navbar from "./Navbar";

import LogoText from "./LogoText";
import styled from "styled-components";
import { Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

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

export default function Landing(props) {
  const history = useHistory();

  return (
    <Container>
      <InnerContainer>
        <LogoText />
      </InnerContainer>
      <Route exact path="/" render={() => <Login history={history} />} />
      <Route exact path="/register" render={() => <SignUp history={history} />} />
      {/* <Route exact path="/" render={() => <Navbar history={history} />} /> */}

    </Container>
  );
}
