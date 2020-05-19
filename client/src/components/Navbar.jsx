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
import formatNavbarText from "../helpers/formatNavbarText";
import Avatar from "@material-ui/core/Avatar";

const Icon = styled(Avatar)`
  width: 50%;
  height: auto;
  margin: auto;
`;

const ClickableLogo = styled.img`
  width: 25%;
  transform: translateX(105%) translateY(-5%);
  ${"" /* transform: translateX(133%) translateY(-5%); */}

  padding: 0.3em
`;

const Greeting = styled.div`
  text-align: center;
  padding: 2em;
  font-size: 1.2em;
`;

const Logo = styled.img`
  width: 70%;
  margin: auto;
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
`;

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  background: #ece9e6; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #ffffff,
    #ece9e6
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #ffffff,
    #ece9e6
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  font-family: "Raleway", sans-serif;
  height: 100%;
  width: 350px;
`;

export default function Navbar({ user, quota }) {
  const { first_name, picture } = user;
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
        // console.log(res);
        console.log("Successful Logout");
        history.push("/");
      })
      .catch(e => {
        console.error(e);
      });
  };

  const list = anchor => (
    <Container
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Logo src="imgs/logo3.png" />
      <List>
        <Icon src={picture} />
      </List>
      <Greeting>Welcome, {first_name}!</Greeting>
      <Message>
        {formatNavbarText(quota.used.minutes, quota.allotment.minutes)}
      </Message>
      <QuotaMessage>
        Today's Usage:
        <QuotaTime>{used_quota}</QuotaTime>
        of
        <QuotaTime>{allotment}</QuotaTime>
      </QuotaMessage>
      <Divider />
      <List>
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
        <Button onClick={toggleDrawer("FocusPocus", true)}>
          <ClickableLogo src="/imgs/logo3.png" alt="Menu Logo" />
        </Button>
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
