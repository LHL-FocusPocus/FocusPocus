import React from "react";
import styled from "styled-components";
import Box from "@material-ui/core/Box"

const Container = styled.div`
  ${"" /* width: 50%; */}
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

const Logo = styled.span`
  font-size: 10em;
  text-transform: lowercase;
  ${'' /* font-weight: 700; */}
  ${'' /* text-transform: uppercase; */}
  ${'' /* font-family: 'Aladin', cursive; */}
  ${'' /* font-family: 'Alata', sans-serif; */}
  font-family: 'Amatic SC', cursive;
  ${'' /* font-family: 'Raleway', sans-serif; */}
`;

const LogoContainer = styled(Box)`
  display: flex;

`

const Tagline = styled.div`
  font-size: 1.7em;
  padding-bottom: 2em;
  text-align: center;
`;
const Sparkles = styled.img`
  height: 50%;
  transform: translateY(30px);
  ${'' /* vertical-align: center; */}
  z-index: 5;
`;
const Wand = styled.img`
  height: 8%;
  ${'' /* margin-right: 3em; */}
  z-index: -1;
  transform: translateX(-125px) translateY(50px);
  ${'' /* vertical-align: center; */}
`;
export default function LogoText() {
  return (
    <Container>
      <Sparkles src="/imgs/logo3.png"/>

      <Tagline>Getting you focused with a little magic.</Tagline>

      <Text>We all know how easy it is to get distracted.</Text>

      <Text>
        It's time to learn better habits and see how much more productive you
        can be.
      </Text>

      <Text>
        With our unique approach, spending too long on time-wasting sites will
        create some hilarious results...
      </Text>
    </Container>
  );
}
