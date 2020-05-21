import React from "react";
import styled from "styled-components";


const Container = styled.div`
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 2;
  transform: translateX(3%) translateY(5%);
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
  transform: translateY(30px);
  ${"" /* vertical-align: center; */}
  z-index: 5;
`;

export default function LogoText() {
  return (
    <Container>
      <Logo src="/imgs/logo3.png" />
      <Tagline>Get Focused With A Little Magic.</Tagline>
    </Container>
  );
}
