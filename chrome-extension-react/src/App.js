import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Login from "./components/Login";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

axios.defaults.baseURL = "http://localhost:9000";
axios.defaults.withCredentials = true;

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function App() {
  const classes = useStyles();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserData = () => {
    setLoading(true);
    return axios
      .get("/api/data/dashboard")
      .then((res) => {
        setUserData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setUserData(null);
        setLoading(false);
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="App">
      {!loading && userData && <p>{JSON.stringify(userData)}</p>}
      {!loading && !userData && (
        <Login getUserData={getUserData} />
      )}
      <Backdrop className={classes.backdrop} open={loading}>
        <h1>Loading </h1> &nbsp;&nbsp;
        <CircularProgress color="inherit" size={30} />
      </Backdrop>
    </div>
  );
}

export default App;
