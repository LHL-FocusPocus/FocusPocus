import React from "react";
import styled from "styled-components";
import { Paper, Box } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const {
    donutGraph,
    lineGraph,
    radialGraph,
    leaderboard,
    shameboard,
    user,
    quota_today,
  } = dashboardData;

  const isOverQuota = () => {
    return quota_today.used.minutes > quota_today.allotment.minutes;
  };

  // Create popup error if user is over quota for today
  toast("⚠️ You are over your quota! ⚠️", {
    containerId: "quota",
  });

  return (
    <div>
      {isOverQuota() && (
        <ToastContainer
          style={{ marginTop: "5%" }}
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          containerId="quota"
        />
      )}
      <Navbar user={user} quota={quota_today} setDashboard={setDashboard} />
      <Container flexWrap="wrap" display="flex">
        <DailyQuotaUsed quota={quota_today} />
        <LineGraph lineData={lineGraph} />
        <Paper component={Wrapper} elevation={24}>
          <Leaderboard leaderboard={leaderboard} />
          <Shameboard shameboard={shameboard} />
        </Paper>
        <Donut donutData={donutGraph} />
        <Radial radialData={radialGraph}
          />
      </Container>
    </div>
  );
}
