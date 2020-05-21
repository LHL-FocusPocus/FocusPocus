import React, { useState } from "react";
import styled from "styled-components";
import { Paper, Box } from "@material-ui/core";
import LineGraph from "./Graphs/LineGraph";
import DailyQuotaUsed from "./Graphs/DailyQuotaUsed";
import Navbar from "./Navbar";
import Donut from "./Graphs/Donut";
import Radial from "./Graphs/Radial";
import Leaderboard from "./Graphs/Leaderboard";
import Shameboard from "./Graphs/Shameboard";

const Container = styled(Box)`
  padding: 5em;
  height: 100%;
`;

const Wrapper = styled(Box)`
  flex: 1 100%;
  display: flex;
  items-align: center;
  justify-content: center;
  height: 500px;
  padding-right: 3%;
  margin-bottom: 3em;
`;

export default function Dashboard({ dashboardData, setDashboard }) {
  // const [error, setError] = useState(null);

  const {
    donutGraph,
    lineGraph,
    radialGraph,
    leaderboard,
    shameboard,
    user,
    quota_today,
  } = dashboardData;

  // console.log("donutData Dashboard :>> ", donutGraph);
  // console.log("radialGraph Dashboard :>> ", radialGraph);
  // console.log("lineGraph Dashboard :>> ", lineGraph);

  // const checkData = () => {
  //   if (
  //     radialGraph.length === 0 ||
  //     donutGraph.length === 0 ||
  //     lineGraph.length === 0
  //   ) {
  //     setError("Something went wrong");
  //   } else {
  //     setError(null);
  //   }
  // };

  // console.log('error :>> ', error);

  return (
    <div>
      <Navbar user={user} quota={quota_today} setDashboard={setDashboard} />
      <Container flexWrap="wrap" display="flex">
        <DailyQuotaUsed quota={quota_today} />
        <LineGraph lineData={lineGraph} />
        <Paper component={Wrapper} elevation={24}>
          <Leaderboard leaderboard={leaderboard} />
          <Shameboard shameboard={shameboard} />
        </Paper>
        <Donut donutData={donutGraph} />
        <Radial
          radialData={radialGraph}
          //  error={error}
        />
      </Container>
    </div>
  );
}
