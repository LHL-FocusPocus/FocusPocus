import React from "react";
import Navbar from "./Navbar";
import styled from "styled-components";
import DailyQuotaUsed from "./Graphs/DailyQuotaUsed";
import Box from "@material-ui/core/Box";
import LineGraph from "./Graphs/LineGraph";
import Donut from "./Graphs/Donut";
import Radial from "./Graphs/Radial";
import Graph3 from "./Graphs/Graph3";

const Container = styled(Box)`
  ${"" /* display: flex; */}
  ${'' /* flex-flow: row-wrap; */}
  ${"" /* padding: 3em; */}
  padding: 3em;
  ${'' /* border: 3px solid green; */}
  height: 100vh;
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
        <Donut />
        <Radial />
        <Graph3 />
      </Container>
    </Background>
  );
}
