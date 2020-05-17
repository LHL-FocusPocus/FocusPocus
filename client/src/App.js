import React from "react";
import Landing from "./components/Landing";
import LogoText from "./components/LogoText";
import styled from "styled-components";
import Dashboard from "./components/Dashboard";
import Options from "./components/Options";
import { Route, Link } from "react-router-dom";
import useApplicationData from "./hooks/useApplicationData";

import axios from "axios";
import "./App.css";
import { quadOut } from "@amcharts/amcharts4/.internal/core/utils/Ease";
axios.defaults.baseURL = "http://localhost:9000";
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

  // console.log("====> setDashboard", setDashboard);
  // console.log("====> quota in App.js", state.quota_today);
  // console.log("====> Appjs Blacklisted State", state.blacklisted);

  return (
    <div className="App">
      <Route
        exact
        path={["/", "/register"]}
        render={() => <Landing setDashboard={setDashboard} />}
      />
      <Route
        exact
        path="/dashboard"
        render={() =>
          state.quota_today.allotment && <Dashboard dashboardData={state} />
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
    </div>
  );
}

export default App;
