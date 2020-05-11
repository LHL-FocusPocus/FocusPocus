import React from 'react'
import styled from "styled-components";
import Box from '@material-ui/core/Box';

const Wrapper = styled(Box)`
  ${'' /* border: solid 3px black; */}
  flex: 1 33%; 
  display: flex;
  items-align: center;
  justify-content: center;

  @media (max-width: 1300px) {
    order: 2;
    flex: 1 49%;
  }
`

const Chart = styled.div`
  align-self: center;
`

export default function Graph2() {
  return (
    <Wrapper>
      <Chart>Graph 2</Chart>
    </Wrapper>
  )
}
