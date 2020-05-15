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
axios.defaults.baseURL = "http://localhost:9000";
axios.defaults.withCredentials = true;

// import Routes from "./routes";

function App() {
  const {
    state,
    disableBlacklistedSite,
    addBlacklistedSite,
    setDashboard,
    changeQuota
  } = useApplicationData();

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
        render={() => <Dashboard dashboardData={state} />}
      />
      <Route
        exact
        path="/options"
        render={() => (
          <Options
            changeQuota={changeQuota}
            addBlacklistedSite={addBlacklistedSite}
            disableBlacklistedSite={disableBlacklistedSite}
            users={state.users}
            quota={state.quota_today}
            blacklisted={state.blacklisted}
          />
        )}
      />
    </div>
  );
}

export default App;
