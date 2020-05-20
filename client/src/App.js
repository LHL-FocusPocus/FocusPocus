import React from "react";
import Landing from "./components/Landing";
import LogoText from "./components/LogoText";
import styled from "styled-components";
import Dashboard from "./components/Dashboard";
import Options from "./components/Options";
import { Route, Link } from "react-router-dom";
import useApplicationData from "./hooks/useApplicationData";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import axios from "axios";
import "./App.css";
import { quadOut } from "@amcharts/amcharts4/.internal/core/utils/Ease";
import { useHistory } from "react-router-dom";
if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
} else {
  axios.defaults.baseURL = "http://localhost:9000";
}
axios.defaults.withCredentials = true;

// import Routes from "./routes";

function App() {
  const {
    state,
    disableBlacklistedSite,
    addBlacklistedSite,
    setDashboard,
    changeQuota,
  } = useApplicationData();

  const theme = createMuiTheme({
    typography: {
      fontFamily: "Amatic SC, sans-serif",
      fontSize: 25,
      fontWeight: "700",
    },
  });
  const history = useHistory();
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Route
          exact
          path={["/"]}
          render={() =>
            !state.quota_today.allotment
              ? history.push("/login")
              : history.push("/dashboard")
          }
        />
        <Route
          exact
          path={["/login", "/register"]}
          render={() =>
            !state.quota_today.allotment ? (
              <Landing setDashboard={setDashboard} />
            ) : (
              history.push("/dashboard")
            )
          }
        />
        <Route
          exact
          path={["/logout"]}
          render={() => <Landing setDashboard={setDashboard} />}
        />
        <Route
          exact
          path="/dashboard"
          render={() =>
            state.quota_today.allotment && (
              <Dashboard dashboardData={state} setDashboard={setDashboard} />
            )
          }
        />
        <Route
          exact
          path="/options"
          render={() =>
            state.quota_today.allotment && (
              <Options
                changeQuota={changeQuota}
                addBlacklistedSite={addBlacklistedSite}
                disableBlacklistedSite={disableBlacklistedSite}
                dashboardData={state}
                // user={state.user}
                blacklisted={state.blacklisted}
                // quota_today={state.quota_today}
              />
            )
          }
        />
      </ThemeProvider>
    </div>
  );
}

export default App;
