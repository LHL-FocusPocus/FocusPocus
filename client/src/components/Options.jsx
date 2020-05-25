import React, { createContext } from "react";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import TopBlacklisted from "./TopBlacklisted";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Customization from "./Customization";
import Blacklisted from "./Blacklisted";
import QuotaSlider from "./QuotaSlider";
import Navbar from "./Navbar";

export const CardContext = createContext({});

const Container = styled(Box)`
  padding: 2em;
  padding-top: 3em;
  display: flex;
  justify-content: space-around;
  @media (max-width: 1300px) {
    flex-direction: column;
  }
`;

const QuotaAndCustomization = styled(Box)`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  flex: 1;

  @media (max-width: 1300px) {
    order: 3;
  }
  
`;

const theme = createMuiTheme({
  typography: {
    fontFamily: "Raleway, sans-serif",
    fontSize: 15,
  },
});

export default function Options({
  blacklisted,
  addBlacklistedSite,
  disableBlacklistedSite,
  changeQuota,
  dashboardData,
  setDashboard,
}) {
  const { quota_today, topBlacklisted, user } = dashboardData;

  const addTopSiteToUserBlacklist = hostname => {
    addBlacklistedSite(hostname);
  };

  return (
    <DndProvider backend={Backend}>
      <CardContext.Provider value={{ addTopSiteToUserBlacklist }}>
        <Navbar user={user} quota={quota_today} setDashboard={setDashboard} />
        <ThemeProvider theme={theme}>
          <Container bgcolor="background.paper">
            <QuotaAndCustomization>
              {quota_today && (
                <QuotaSlider
                  quota={quota_today}
                  changeQuota={changeQuota}
                  options={user.options}
                />
              )}
              <Customization
                userOptions={user.options}
              />
            </QuotaAndCustomization>
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
