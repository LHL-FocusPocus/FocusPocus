import React from 'react'
import styled from "styled-components";
import Box from '@material-ui/core/Box';


const Wrapper = styled(Box)`
  border: solid 3px black;
  flex: 1 25%;
  display: flex;
  items-align: center;
  justify-content: center;

  @media (max-width: 1300px) {
    flex: 1 40%;
    order: -1;
  }
`

const Chart = styled.div`
  align-self: center;
`

export default function DailyQuotaUsed() {
  return (
    <Wrapper>
      <Chart>Daily Quota</Chart>
    </Wrapper>
  )
}