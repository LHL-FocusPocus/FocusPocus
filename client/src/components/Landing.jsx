import React from "react";
import styled from "styled-components";
import { useHistory, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import LogoText from "./LogoText";

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
`;

export default function Landing({ setDashboard }) {
  const history = useHistory();

  return (
    <Container>
      <LogoText />
      <Route
        exact
        path={["/login", "/logout"]}
        render={() => <Login setDashboard={setDashboard} history={history} />}
      />
      <Route
        exact
        path="/register"
        render={() => <SignUp setDashboard={setDashboard} history={history} />}
      />
    </Container>
  );
}
