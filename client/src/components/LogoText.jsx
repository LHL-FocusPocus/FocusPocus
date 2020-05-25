import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 2;
  transform: translateX(3%) translateY(5%);

  @media (max-width: 1300px) {
    transform: none;
    margin: 2em;
  }
`;

const ClickableLink = styled.a`
  text-decoration: none;
  color: purple;
`;

const Tagline = styled.div`
  font-size: 2em;
  padding: 1em 0;
  padding-top: 0.5em;
  text-align: center;
  font-family: "Amatic SC", cursive;
  text-shadow: -0.5px 0 black, 0 0.5px black, 0.5px 0 black, 0 -0.5px black;
`;

const Logo = styled.img`
  height: 50%;
  transform: translateY(30px) translateX(175px);
  z-index: 5;

  @media (max-width: 1300px) {
   height: 250px;
   transform: none;
  }
`;

// const EXTENSION_URL = "https://github.com/LHL-FocusPocus/FocusPocus/releases";
const EXTENSION_URL = "https://chrome.google.com/webstore/detail/focus-pocus-extension/ognhkeempdpgnfkliplegljejeakonlg/"

export default function LogoText() {
  return (
    <Container>
      <ClickableLink href={EXTENSION_URL} target="_blank">
        <Logo src="/imgs/logo3.png" />
        <Tagline>Get Focused With A Little Magic.</Tagline>
      </ClickableLink>
    </Container>
  );
}
