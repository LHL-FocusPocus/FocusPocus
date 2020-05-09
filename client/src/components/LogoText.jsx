import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 50%;
  height: 70vh;
  display: flex;
  flex-direction: column;
  ${'' /* padding: 50%; */}
  ${'' /* margin: 25% */}
  ${'' /* text-align: center; */}
  justify-content: space-around;
  align-items: center;
  background-color: pink;
`

const Text = styled.div`
  margin: auto;
  ${'' /* flex: 1; */}
`

export default function LogoText() {
  return (
    <Container>
      <h1>FocusPocus</h1>

      <Text>Getting you focused through the power of a little magic</Text>

      <Text>We all know how easy it is to get distracted.</Text>

      <Text>It's time to learn better habits and see how much more productive you can be.</Text>

      <Text>With our unique approach, spending too long on time-wasting sites will create some hilarious results...</Text>
    </Container>
  )
}
