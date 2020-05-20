import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Route, Link } from "react-router-dom";
import { Divider, IconButton } from "@material-ui/core";

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
import Box from "@material-ui/core/Box";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";

const useStyles = makeStyles(theme => ({
  button: {
    minWidth: "400",
    transform: "translateY(-65%) translateX(73%)",
    borderRadius: "100%",
  },
  navbarBgGradient:{}
}));

const Icon = styled(Avatar)`
  width: 35%;
  height: auto;
  margin: auto;
  margin-top: 1.5em;
  margin-bottom: 0.6em;
  box-shadow: 5px 19px 38px rgba(0, 0, 0, 0.3), 0 15px 38px rgba(0, 0, 0, 0.22);
`;

const DrawerIcon = styled(MenuOpenIcon)`
  width: 35px;
  height: 40px;
`;

const NavbarLogo = styled.img`  
  width: 260px;
  margin-left: 50%;
  margin-top: 1%;  
  transform: translateX(-180px);
`;

const Greeting = styled.div`
  text-align: center;
  padding: 1.5em;
  font-size: 1.5em;
`;

const Logo = styled.img`
  width: 70%;
  margin: 2em auto;
`;

const LogoContainer = styled(Box)`
  background-image: url("imgs/landing-bg.png");
  background-size: cover;
  text-align: center;
  box-shadow: 0 8px 20px -6px slategrey;
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

export default function Navbar({ user, quota, setDashboard }) {
  const classes = useStyles();

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
        setDashboard();
        history.push("/logout");
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
      <LogoContainer>
        <Logo src="imgs/logo3.png" />
      </LogoContainer>
      <List>
        <Icon src={picture} />
      </List>
      <Greeting>
        Welcome, <strong>{first_name}</strong>!
      </Greeting>
      <Message>
        {formatNavbarText(quota.used.minutes, quota.allotment.minutes)}
      </Message>
      <QuotaMessage>
        <strong>Today's Usage</strong>
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
      <List onClick={handleLogout}>
        <ListItem button id="logout">
          <ListItemIcon>
            <PowerSettingsNewIcon />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItem>
      </List>
    </Container>
  );

  return (
    <div>
      <>
        <div>
          <Button
            className={classes.button}
            onClick={toggleDrawer("FocusPocus", true)}
          >
            <DrawerIcon />
          </Button>
          <NavbarLogo src="/imgs/logo3.png" alt="Menu Logo" />
        </div>
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
