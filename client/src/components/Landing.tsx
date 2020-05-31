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

  @media (max-width: 1300px) {
    flex-direction: column;
    height: auto;
  }
`;

const GitHub = styled(IconButton)`
  position: fixed !important;
  left: 0.8em !important;
  top: 0.6em !important;

  @media (max-width: 1300px) {
    left: 0.2em !important;
    top: 0.2em !important;
  }
`;

const GithubLink = styled.a`
  text-decoration: none;
  color: black;
`;

export default function Landing({ setDashboard }: any) {
  const history = useHistory();

  return (
    <Container>
      <GitHub>
        <GithubLink href="https://github.com/LHL-FocusPocus/FocusPocus">
          <GitHubIcon style={{ maxWidth: 35 }} />
        </GithubLink>
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
