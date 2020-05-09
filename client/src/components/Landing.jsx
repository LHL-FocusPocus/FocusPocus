import React from 'react'
import SignUp from './SignUp'
import LogoText from "./LogoText"
import styled from 'styled-components'


const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100vh
`

export default function Landing() {
  return (
    <Container>
      <LogoText />
      <SignUp/>
    </Container>
  )
}
