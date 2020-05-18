import React from "react";
import styled from "styled-components";
import Box from "@material-ui/core/Box";

const Container = styled.div`
  height: 50vh;
  display: flex;
  flex-direction: column;
  ${"" /* padding: 50%; */}
  ${"" /* margin-left: 25% */}
  ${"" /* text-align: center; */}
  ${"" /* justify-content: space-around; */}
  align-items: center;
  margin: auto;
  ${"" /* padding-left: 20em */}
`;

const Text = styled.div`
  margin: 1em 0em;
  text-align: center;
  font-size: 1.2em;
`;

const LogoContainer = styled(Box)`
  display: flex;
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

const Wand = styled.img`
  height: 8%;
  ${"" /* margin-right: 3em; */}
  z-index: -1;
  transform: translateX(-125px) translateY(50px);
  ${"" /* vertical-align: center; */}
`;
export default function LogoText() {
  return (
    <Container>
      <Logo src="/imgs/logo3.png" />

      <Tagline>Get Focused With A Little Magic.</Tagline>

      {/* <Text>We all know how easy it is to get distracted.</Text>

      <Text>
        It's time to learn better habits and see how much more productive you
        can be.
      </Text>

      <Text>
        With our unique approach, spending too long on time-wasting sites will
        create some hilarious results...
      </Text> */}
    </Container>
  );
}
