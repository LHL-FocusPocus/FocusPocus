import React from "react";
import Navbar from "./Navbar";
import Blacklisted from "./Blacklisted";
import Box from "@material-ui/core/Box";
import styled from "styled-components";
import QuotaSlider from "./QuotaSlider";
import TopBlacklisted from "./TopBlacklisted";

const Container = styled(Box)`
  padding: 4em;
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
  changeQuota,
  dashboardData,
  // quota_today,
}) {
  const { quota_today, topBlacklisted } = dashboardData;

  // if (!dashboardData || !user || quota_today == undefined) {
  //   return null;
  //   // return a spinner component
  // }

  // const quota_today = { setDashboard }
  return (
    <div>
      <Navbar
        user={dashboardData.user}
        quota={quota_today}
        // dashboard={setDashboard}
      />
      <Container bgcolor="background.paper">
        {quota_today && (
          <Slider quota={quota_today} changeQuota={changeQuota} />
        )}
        <Blacklisted
          addBlacklistedSite={addBlacklistedSite}
          disableBlacklistedSite={disableBlacklistedSite}
          blacklisted={blacklisted}
        />
        <TopBlacklisted topBlacklisted={topBlacklisted} />
      </Container>
    </div>
  );
}
