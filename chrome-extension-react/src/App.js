import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState({ state: "loading" });
  useEffect(() => {
    axios
      .get("http://localhost:9000")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setData(err);
      });
  }, []);

  return (
    <div className="App">
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}

export default App;
