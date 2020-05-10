import React from 'react'
import Navbar from "./Navbar"
import styled from "styled-components";
import DailyQuotaUsed from "./DailyQuotaUsed";
import Box from '@material-ui/core/Box';
import LineGraph from "./LineGraph";


import { flexbox, flex, flexGrow } from '@material-ui/system';


const Container = styled(Box)`
  ${'' /* display: flex; */}
  flex-flow: row-wrap;
  ${'' /* padding: 3em; */}
  padding: 0.5em;
  border: 3px solid green;
`

const Background = styled.div`
  background-image: none;
`

export default function Dashboard() {
  return (
    <Background>
      <Navbar />
      <Container flexWrap="wrap" display="flex">
        <DailyQuotaUsed />
        <LineGraph />
      </Container>
    </Background>
  )
}
