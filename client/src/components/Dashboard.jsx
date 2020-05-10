import React from 'react'
import Navbar from "./Navbar"
import styled from "styled-components";
import DailyQuotaUsed from "./DailyQuotaUsed";
import Box from '@material-ui/core/Box';


import { flexbox, flex, flexGrow } from '@material-ui/system';


const Container = styled(Box)`
  ${'' /* display: flex; */}
  flex-flow: row-wrap;
  margin: 4em;
`

const Background = styled.div`
  background-image: none;
`

export default function Dashboard() {
  return (
    <Background>
      <Navbar />
      <Container flexWrap="wrap" width="100%" display="flex">
        <DailyQuotaUsed flexGrow={1} />
      </Container>
    </Background>
  )
}
