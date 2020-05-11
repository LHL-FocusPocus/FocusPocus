import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  ${'' /* width: 50%; */}
  height: 50vh;
  display: flex;
  flex-direction: column;
  ${'' /* padding: 50%; */}
  ${'' /* margin-left: 25% */}
  ${'' /* text-align: center; */}
  ${'' /* justify-content: space-around; */}
  align-items: center;
  margin: auto;
  ${'' /* padding-left: 20em */}
`

const Text = styled.div`
  margin: 1em 0em;
  text-align: center;
  font-size: 1.2em
`

const Logo = styled.span`
  font-size: 5em;
`

const Tagline = styled.div`
  font-size: 1.7em;
  padding-bottom: 2em;
  text-align: center
`
const Icon = styled.img`
  height: 5%;
  vertical-align: center
`
export default function LogoText() {
  return (
    <Container>
      <Logo>Focus{/* <Icon src="/imgs/wand.png"/> */}Pocus</Logo>

      <Tagline>Getting you focused with a little magic.</Tagline>

      <Text>We all know how easy it is to get distracted.</Text>

      <Text>It's time to learn better habits and see how much more productive you can be.</Text>

      <Text>With our unique approach, spending too long on time-wasting sites will create some hilarious results...</Text>
    </Container>
  )
}
