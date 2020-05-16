import React from "react";
import Navbar from "./Navbar";
import Blacklisted from "./Blacklisted";
import Box from "@material-ui/core/Box";
import styled from "styled-components";
import QuotaSlider from "./QuotaSlider";

const Container = styled(Box)`
  padding: 5em;
  height: 100%;
  display: flex;
  justify-content: flex-start;
`;

const Slider = styled(QuotaSlider)`
  ${"" /* width: 30%; */}
  ${"" /* padding-left: 20%; */}
  transform: translateX(200px);
`;

export default function Options({
  // user,
  blacklisted,
  addBlacklistedSite,
  disableBlacklistedSite,
  dashboardData,
  // quota_today,
}) {
  const { user, quota_today } = dashboardData;

  console.log("====> On OPTIONS page");

  if (!dashboardData || !user || quota_today === undefined) {
    return null;
    // return a spinner component
  }

  console.log("====> Options blacklisted", blacklisted);
  console.log("====> Options User", user);

  // const quota_today = { setDashboard }
  return (
    <div>
      <Navbar
        user={user}
        quota={quota_today}
        // dashboard={setDashboard}
      />
      <Container bgcolor="background.paper">
        <Slider />
        <Blacklisted
          addBlacklistedSite={addBlacklistedSite}
          disableBlacklistedSite={disableBlacklistedSite}
          blacklisted={blacklisted}
        />
      </Container>
    </div>
  );
}
