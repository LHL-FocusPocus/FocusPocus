import React from "react";
import styled from "styled-components";
import GitHubIcon from "@material-ui/icons/GitHub";
import { IconButton } from "@material-ui/core";

const Container = styled.div`
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 2;
  transform: translateX(2%) translateY(-8%);
`;

const GitHub = styled(IconButton)`
  transform: translateY(-210px) translateX(-575px);
`;
const Tagline = styled.div`
  font-size: 2em;
  padding: 1em 0;
  text-align: center;
  font-family: "Amatic SC", cursive;
  text-shadow: -0.5px 0 black, 0 0.5px black, 0.5px 0 black, 0 -0.5px black;
`;

const Logo = styled.img`
  height: 50%;
  transform: translateY(30px);
  ${"" /* vertical-align: center; */}
  z-index: 5;
`;

export default function LogoText() {
  return (
    <Container>
      <GitHub href="https://github.com/LHL-FocusPocus/FocusPocus">
        <GitHubIcon style={{ maxWidth: 35 }} />
      </GitHub>
      <Logo src="/imgs/logo3.png" />
      <Tagline>Get Focused With A Little Magic.</Tagline>
    </Container>
  );
}
