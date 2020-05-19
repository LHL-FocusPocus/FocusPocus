import React from "react";
import Navbar from "./Navbar";
import styled from "styled-components";
import DailyQuotaUsed from "./Graphs/DailyQuotaUsed";
import { Paper, Box } from "@material-ui/core";
import LineGraph from "./Graphs/LineGraph";
import Donut from "./Graphs/Donut";
import Radial from "./Graphs/Radial";
import Leaderboard from "./Graphs/Leaderboard";
import Shameboard from "./Graphs/Shameboard";
import loading from "../helpers/loading";
import { useHistory } from "react-router-dom";


const Container = styled(Box)`
  padding: 5em;
  height: 100%;
`;


const Card = styled(Paper)`
  ${'' /* width: 100%; */}
  height: 2px;
  
`

const Wrapper = styled(Box)`
  ${"" /* border: solid 3px black; */}
  flex: 1 100%;
  display: flex;
  items-align: center;
  justify-content: center;
  ${"" /* padding: 3em; */}
  height: 500px;
  ${'' /* transform: translateX(30px); */}
  padding-right: 3%;
  margin-bottom: 3em;  


  ${"" /* @media (max-width: 1300px) {
    flex: 1 100;
    ${"" /* order: -1 */}
  } */}
`;

export default function Dashboard({ dashboardData }) {
  const {
    donutGraph,
    lineGraph,
    radialGraph,
    leaderboard,
    shameboard,
    user,
    quota_today,
  } = dashboardData;


  if (!dashboardData || quota_today == undefined) {
    return null;
    // return a spinner component
  }
  
// console.log("In dashboard, quota_today should be =====>", quota_today)

console.log('dashboardData :>> ', dashboardData);
console.log('user :>> ', user);

  
  return (
    <div>
      <Navbar user={user} quota={quota_today} />
      <Container
        // isLoading={loading}
        // bgcolor="background.paper"
        flexWrap="wrap"
        display="flex"
      >
        {quota_today && <DailyQuotaUsed quota={quota_today} />}
        {lineGraph && <LineGraph lineData={lineGraph} />}
        <Card component={Wrapper} elevation={24}>
          {leaderboard && <Leaderboard leaderboard={leaderboard} />}
          {shameboard && <Shameboard shameboard={shameboard} />}
        </Card>

        {donutGraph && <Donut donutData={donutGraph} />}
        {radialGraph && <Radial radialData={radialGraph} />}

        {!quota_today && <h1>loading... (will be replaced by spinner)</h1>}
      </Container>
    </div>
  );
}
