import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 50%;
  display: flex-column;
  ${'' /* padding: 50%; */}
  ${'' /* margin: 25% */}
  ${'' /* text-align: center; */}
  justify-content: center;
  align-items: center
`

export default function LogoText() {
  return (
    <Container>
      <div>FocusPocus</div>

      <div>Getting you focused through the power of a little magic</div>

      <div>We all know how easy it is to get distracted.</div>

      <div>It's time to learn better habits and see how much more productive you can be.</div>

      <div>With our unique approach, spending too long on time-wasting sites will create some hilarious results...</div>
    </Container>
  )
}
