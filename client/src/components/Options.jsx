import React, { createContext } from "react";
import Navbar from "./Navbar";
import Blacklisted from "./Blacklisted";
import Box from "@material-ui/core/Box";
import styled from "styled-components";
import QuotaSlider from "./QuotaSlider";
import TopBlacklisted from "./TopBlacklisted";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

export const CardContext = createContext({});

const Container = styled(Box)`
  padding: 5em;
  display: flex;
  justify-content: space-around;
`;

const SliderDiv = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding-top: 2em;
  flex-direction: column;
  flex-wrap: wrap;
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
  const { quota_today, topBlacklisted, user } = dashboardData;

  // if (!dashboardData || !user || quota_today == undefined) {
  //   return null;
  //   // return a spinner component
  // }

  // console.log("====> Options disabled blacklisted site", disableBlacklistedSite);


  const addTopSiteToUserBlacklist = hostname => {
    addBlacklistedSite(hostname);
  };

  return (
    <DndProvider backend={Backend}>
      <CardContext.Provider value={{ addTopSiteToUserBlacklist }}>
        <Navbar user={user} quota={quota_today} />
        <Container bgcolor="background.paper">
          {quota_today && (
            <QuotaSlider
              options={user.options}
              quota={quota_today}
              changeQuota={changeQuota}
            />
          )}
          <Blacklisted
            addBlacklistedSite={addBlacklistedSite}
            disableBlacklistedSite={disableBlacklistedSite}
            blacklisted={blacklisted}
          />
          <TopBlacklisted topBlacklisted={topBlacklisted} />
        </Container>
      </CardContext.Provider>
    </DndProvider>
  );
}
