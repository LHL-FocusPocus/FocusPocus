import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { Route, Switch } from "react-router-dom";
import React from "react";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={SignUp} />
    </Switch>
  );
}
