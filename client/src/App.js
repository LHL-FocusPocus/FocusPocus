import React from "react";
import Landing from "./components/Landing";
import axios from 'axios';
import "./App.css";
axios.defaults.baseURL = "http://localhost:9000";

// import Routes from "./routes";

function App() {
  return (
    <div className="App">
      <Landing  />
    </div>
  );
}

export default App;
