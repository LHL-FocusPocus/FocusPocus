import React from "react";
import Navbar from "./Navbar";
import styled from "styled-components";
import DailyQuotaUsed from "./Graphs/DailyQuotaUsed";
import Box from "@material-ui/core/Box";
import LineGraph from "./Graphs/LineGraph";
import Donut from "./Graphs/Donut";
import Radial from "./Graphs/Radial";
import Leaderboard from "./Graphs/Leaderboard";
import Shameboard from "./Graphs/Shameboard";
import loading from "../helpers/loading";

const Container = styled(Box)`
  padding: 3em;
  height: 100%;
`;

// const DashboardContainer = loading(Container);

export default function Dashboard({ dashboard, loading }) {
  const {
    donutGraph,
    lineGraph,
    radialGraph,
    leaderboard,
    shameboard,
    user,
    quota_today,
  } = dashboard;

  return (
    <div>
      <Navbar user={user} />
      <Container
        // isLoading={loading}
        bgcolor="background.paper"
        flexWrap="wrap"
        display="flex"
      >
        {quota_today && <DailyQuotaUsed quota={quota_today} />}
        {lineGraph && <LineGraph lineData={lineGraph} />}
        {donutGraph && <Donut donutData={donutGraph} />}
        {radialGraph && <Radial radialData={radialGraph} />}
        {leaderboard && <Leaderboard leaderboard={leaderboard} />}
        {shameboard && <Shameboard shameboard={shameboard} />}

        {!dashboard.quota_today && (
          <h1>loading... (will be replaced by spinner)</h1>
        )}
      </Container>
    </div>
  );
}