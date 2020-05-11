import React from 'react'
import Box from '@material-ui/core/Box';
import styled from "styled-components";

const Wrapper = styled(Box)`
  ${'' /* border: 3px solid black; */}
  flex: 1 39vw;
  display: flex;
  items-align: center;
  justify-content: center;

  @media (max-width: 1300px) {
    flex: 1 100%;
    order: 5;
  }
`

const Chart = styled.div`
  align-self: center;
`

export default function LineGraph() {
  return (
    <Wrapper>
      <Chart>Line Graph</Chart>
    </Wrapper>
  )
}
