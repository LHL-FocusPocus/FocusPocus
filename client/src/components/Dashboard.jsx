import React, { useEffect } from "react";
import Navbar from "./Navbar";
import styled from "styled-components";
import DailyQuotaUsed from "./Graphs/DailyQuotaUsed";
import Box from "@material-ui/core/Box";
import LineGraph from "./Graphs/LineGraph";
import Donut from "./Graphs/Donut";
import Radial from "./Graphs/Radial";
import Leaderboard from "./Graphs/Leaderboard";
import Shameboard from "./Graphs/Shameboard"
import axios from "axios";

const Container = styled(Box)`
  ${"" /* display: flex; */}
  ${'' /* flex-flow: row-wrap; */}
  ${"" /* padding: 3em; */}
  padding: 3em;
  height: 100vh;
`;

export default function Dashboard() {

  // useEffect(() => {
  //   axios.get("/api/data/dashboard")
  //     .then(userData => {
  //       console.log(userData)
  //     })
  //     .catch(e => console.error(e));
  // }, []);
  return (
    <div>
      <Navbar />
      <Container bgcolor="background.paper" flexWrap="wrap" display="flex">
        <DailyQuotaUsed />
        <LineGraph />
        <Donut />
        <Radial />
        <Leaderboard />
        <Shameboard />
      </Container>
    </div>
  );
}
