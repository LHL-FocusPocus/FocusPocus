import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Login from "./components/Login";

axios.defaults.baseURL = "http://localhost:9000";
axios.defaults.withCredentials = true;

function App() {
  const [data, setData] = useState({ state: "loading" });
  useEffect(() => {
    axios
      .get("/")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setData(err);
      });
  }, []);

  return (
    <div>
      <Login />
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}

export default App;
