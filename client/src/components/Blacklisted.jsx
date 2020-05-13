import React from 'react'
import BlacklistedCards from "./BlacklistedCards"
import styled from "styled-components";
import Box from "@material-ui/core/Box"

const Container = styled(Box)`
  height: 80vh;
  padding: 0 40%;
`

export default function Blacklisted() {
  return (
    <Container>
      <BlacklistedCards />
    </Container>
  )
}
