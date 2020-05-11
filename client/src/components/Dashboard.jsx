import React from "react";
import Navbar from "./Navbar";
import styled from "styled-components";
import DailyQuotaUsed from "./Graphs/DailyQuotaUsed";
import Box from "@material-ui/core/Box";
import LineGraph from "./Graphs/LineGraph";
import Graph1 from "./Graphs/Graph1";
import Graph2 from "./Graphs/Graph2";
import Graph3 from "./Graphs/Graph3";

const Container = styled(Box)`
  ${"" /* display: flex; */}
  ${'' /* flex-flow: row-wrap; */}
  ${"" /* padding: 3em; */}
  padding: 3em;
  border: 3px solid green;
  height: 85.4vh;
`;

const Background = styled.div`
  background-image: none;
`;

export default function Dashboard() {
  return (
    <Background>
      <Navbar />
      <Container bgcolor="background.paper" flexWrap="wrap" display="flex">
        <DailyQuotaUsed />
        <LineGraph />
        <Graph1 />
        <Graph2 />
        <Graph3 />
      </Container>
    </Background>
  );
}
