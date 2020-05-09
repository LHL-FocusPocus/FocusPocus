import React from "react";
import Landing from "./components/Landing";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Routes from "./routes"


import "./App.css";

function App() {
  return (
    <div className="App">
        <Landing />
    </div>
  );
}

export default App;
