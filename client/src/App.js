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
  const { state, deleteBlacklistedSite } = useApplicationData();
  return (
    <div className="App">
      <Route exact path={["/", "/register"]} component={Landing} />
      <Route
        exact
        path="/dashboard"
        render={() => <Dashboard dashboardData={state} />}
      />
      <Route exact path="/options" render={() => <Options deleteBlacklistedSite={deleteBlacklistedSite} users={state.users} blacklist={state.blacklist} />} />
    </div>
  );
}

export default App;
