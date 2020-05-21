import React from "react";
import styled from "styled-components";
import { useHistory, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import LogoText from "./LogoText";
import GitHubIcon from "@material-ui/icons/GitHub";
import { IconButton } from "@material-ui/core";

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

const GitHub = styled(IconButton)`
  position: fixed !important;
  left: 0.8em !important;
  top: 0.6em !important;
`;

export default function Landing({ setDashboard }) {
  const history = useHistory();

  return (
    <Container>
      <GitHub href="https://github.com/LHL-FocusPocus/FocusPocus">
        <GitHubIcon style={{ maxWidth: 35 }} />
      </GitHub>
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
