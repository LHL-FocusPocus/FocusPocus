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
import { useHistory } from "react-router-dom";
import humanizeDuration from "humanize-duration";

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
  font-size: 1.1em;
`;

const QuotaMessage = styled.div`
  text-align: center;
  padding: 1.5em;
  font-size: 0.9em;
  padding-bottom: 4em;
`;

const QuotaTime = styled.div`
  font-size: 1.1em;
  padding: 0.5em;
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

export default function Navbar({ user, quota }) {
  console.log('quota in navbar', quota)
  // console.log("====> Navbar Props ====>", props);
  const { first_name } = user;
  const humanizeDurationOptions = {
    units: ["h", "m"],
    delimiter: " and ",
    round: true,
  };
  const used_quota = humanizeDuration(
    quota.used.minutes * 60000,
    humanizeDurationOptions
  );
  const allotment = humanizeDuration(
    quota.allotment.minutes * 60000,
    humanizeDurationOptions
  );
  const total_browsing = humanizeDuration(
    quota.all_browse_time.minutes * 60000,
    humanizeDurationOptions
  );
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

  const history = useHistory();


  const handleLogout = function () {
    axios
      .post("/api/user/logout")
      .then(res => {
        console.log(res);
        console.log("Successful Logout");
        history.push("/");
      })
      .catch(e => {
        console.error(e);
      });
  };

  const text = (used_quota, allotment) => {
    const remaining = used_quota / allotment;
    if (remaining < 0.5) {
      return "You seem to be on track today, keep up the good work!";
    } else if (remaining < 0.8) {
      return "Pace yourself, you're getting close to your browsing cap!";
    } else if (remaining < 1) {
      return "You're almost at the cap for today!";
    } else {
      return "Welp, have fun browsing now!";
    }
  };

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
        Welcome, {first_name}!
        {/* TODO: Make this dynamic based on user firstName */}
      </Greeting>
      <Message>
        {text(quota.used.minutes, quota.allotment.minutes)}
      </Message>
      <QuotaMessage>
        Today's Usage:
        <QuotaTime>{used_quota}</QuotaTime>
        of
        <QuotaTime>{allotment}</QuotaTime>
      </QuotaMessage>
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
      <Logout onClick={handleLogout}>
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
