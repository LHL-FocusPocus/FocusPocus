import React, { useEffect } from "react";
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
import { DashboardInterface } from "../helpers/interfaces";

interface Props {
  dashboardData: DashboardInterface;
  setDashboard: any;
}

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
  @media (max-width: 1300px) {
    flex: 1 100%;
    order: 5;
    padding-right: 0;
  }
`;

export default function Dashboard({ dashboardData, setDashboard }: Props) {
  const {
    donutGraph,
    lineGraph,
    radialGraph,
    leaderboard,
    shameboard,
    user,
    quota,
  } = dashboardData;

  const isOverQuota = () => {
    return quota.used.minutes > quota.allotment.minutes;
  };

  // Create popup error if user is over quota for today
  useEffect(() => {
    toast("⚠️ You are over your quota! ⚠️", {
      containerId: "quota",
    });
  }, []);

  return (
    <div>
      {isOverQuota() && (
        <ToastContainer
          style={{
            marginTop: "4%",
            width: "400px",
            fontSize: "30px",
            textAlign: "center",
            display: "inline-block",
          }}
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          containerId="quota"
        />
      )}
      <Navbar user={user} quota={quota} setDashboard={setDashboard} />
      <Container flexWrap="wrap" display="flex">
        <DailyQuotaUsed quota={quota} />
        <LineGraph lineData={lineGraph} />
        <Paper component={Wrapper} elevation={24}>
          <Leaderboard leaderboard={leaderboard} />
          <Shameboard shameboard={shameboard} />
        </Paper>
        <Donut donutData={donutGraph} />
        <Radial radialData={radialGraph} />
      </Container>
    </div>
  );
}
