import React from 'react'
import Box from '@material-ui/core/Box';
import styled from "styled-components";

const Wrapper = styled(Box)`
  border: 3px solid black;
`


export default function LineGraph() {
  return (
    <Wrapper flexGrow={2}>
      LINEGRAPH
    </Wrapper>
  )
}
