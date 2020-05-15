import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";

import { Route, Link } from "react-router-dom";

import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SettingsIcon from "@material-ui/icons/Settings";
import AssessmentIcon from "@material-ui/icons/Assessment";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import styled from "styled-components";
import Routes from "../routes";
import axios from "axios";


// import Logout from "./Logout"

const useStyles = makeStyles({
  list: {
    width: 310,
  },
  fullList: {
    width: "auto",
  },
});

const Icon = styled.img`
  width: 100%;
  ${"" /* height: 200px;
  object-fit: cover;
  padding: 0em 3.38em;
  margin-top: 1em;
  border-radius: 100%; */}
`;

const Greeting = styled.div`
  text-align: center;
  padding: 2em;
  font-size: 1.2em;
`;

const Logo = styled.div`
  text-align: center;
  font-size: 2em;
  padding: 0.6em;
`;

const Message = styled.div`
  text-align: center;
  padding: 1.5em;
  font-size: 0.9em;
  padding-bottom: 4em;
`;

// TODO: Push logout button to bottom of drawer -> can't get it to work without forcing it with margin (but irrelevant on full screen mode)
const Logout = styled(List)`
  ${"" /* margin-top: auto; */}
  margin-top: 35%;
`;

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  background-color: rgba(72, 80, 87, 0.294);
  height: 100%;
`;

export default function Navbar(props) {
  console.log("NavBarProps =======>", props)
  // user prop is coming back undefined from dashboard.jsx

  const classes = useStyles();
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleLogout = function() {
    console.log("========> In handeLogout")
    axios
    .post("/api/user/logout")
    .then(res => {
      console.log(res);
      console.log("Successful Logout");
      props.history.push("/");
    })
    .catch(e => {
      console.error(e);
    });
  }

  const list = anchor => (
    <Container
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Logo>FocusPocus</Logo>
      <List>
        <Icon src="/imgs/multitasking.jpg"></Icon>
      </List>
      <Greeting>
        Hi, Matt.
        {/* TODO: Make this dynamic based on user firstName */}
      </Greeting>
      <Message>
        Your seem to be on task lately! Keep up the good work.
        {/* TODO: Make this dynamic based on quota usage? [STRETCH] */}
      </Message>
      <Divider />
      <List>
        {/* <Routes /> */}
        {["Dashboard", "Options"].map((text, index) => (
          <ListItem
            button
            key={text}
            component={Link}
            to={`/${text.toLowerCase()}`}
          >
            <ListItemIcon>
              {index % 2 !== 0 ? <SettingsIcon /> : <AssessmentIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* <Logout/> */}
      <Logout
        onClick={handleLogout}
        >
        <ListItem button id="logout">
          <ListItemIcon>
            <PowerSettingsNewIcon />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItem>
      </Logout>
    </Container>
  );

  return (
    <div>
      <>
        <Button onClick={toggleDrawer("FocusPocus", true)}>FocusPocus</Button>
        <Drawer
          open={state["FocusPocus"]}
          onClose={toggleDrawer("FocusPocus", false)}
        >
          {list("FocusPocus")}
        </Drawer>
      </>
    </div>
  );
}
