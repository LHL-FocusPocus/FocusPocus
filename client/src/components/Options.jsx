import React, { createContext } from "react";
import Navbar from "./Navbar";
import Blacklisted from "./Blacklisted";
import Box from "@material-ui/core/Box";
import styled from "styled-components";
import QuotaSlider from "./QuotaSlider";
import TopBlacklisted from "./TopBlacklisted";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Customization from "./Customization";

export const CardContext = createContext({});

const Container = styled(Box)`
  padding: 5em;
  padding-top: 3em;
  display: flex;
  justify-content: space-around;
`;

const QuotaAndFriends = styled(Box)`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  flex: 1;
`;

const Slider = styled(QuotaSlider)`
  ${"" /* transform: translateX(200px); */}
`;
const SliderDiv = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding-top: 2em;
  flex-direction: column;
  flex-wrap: wrap;
`;

const theme = createMuiTheme({
  typography: {
    fontFamily: "Raleway, sans-serif",
    fontSize: "15",
  },
});

export default function Options({
  // user,
  blacklisted,
  addBlacklistedSite,
  disableBlacklistedSite,
  changeQuota,
  dashboardData,
  getPendingFriendRequests,
}) {
  const { quota_today, topBlacklisted, user } = dashboardData;

  console.log("dashboardData :>> ", dashboardData);

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
        <ThemeProvider theme={theme}>
          <Navbar user={user} quota={quota_today} />
          <Container bgcolor="background.paper">
            <QuotaAndFriends>
              {quota_today && (
                <Slider
                  quota={quota_today}
                  changeQuota={changeQuota}
                  options={user.options}
                />
              )}
              <Customization />
            </QuotaAndFriends>
            <Blacklisted
              addBlacklistedSite={addBlacklistedSite}
              disableBlacklistedSite={disableBlacklistedSite}
              blacklisted={blacklisted}
            />
            <TopBlacklisted topBlacklisted={topBlacklisted} />
          </Container>
        </ThemeProvider>
      </CardContext.Provider>
    </DndProvider>
  );
}
