import React from "react";
import Landing from "./components/Landing";
import LogoText from "./components/LogoText";
import styled from "styled-components";
import Dashboard from "./components/Dashboard";
import { Route, Link } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div className="App">
        <Route exact path={["/", "/register"]} component={Landing} />
        <Route exact path="dashboard" component={Dashboard} />
    </div>
  );
}

export default App;
