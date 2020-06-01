import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  Divider,
  Drawer,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Box,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import AssessmentIcon from "@material-ui/icons/Assessment";
import ExtensionIcon from "@material-ui/icons/Extension";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import { useHistory } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import formatNavbarText from "../helpers/formatNavbarText";
import axios from "axios";
import { QuotaData } from "../helpers/interfaces";

interface Props {
  quota: QuotaData;
  user: {
    first_name: string;
    picture: string;
  };
  setDashboard: any;
}

const useStyles = makeStyles(theme => ({
  button: {
    transform: "translateY(-60%) translateX(73%)",
    borderRadius: "100%",
  },
  anchor: { textDecoration: "none", color: "inherit" },
}));

const Icon = styled(Avatar)`
  width: 35%;
  height: auto;
  margin: auto;
  margin-top: 1em;
  box-shadow: 5px 19px 38px rgba(0, 0, 0, 0.3), 0 15px 38px rgba(0, 0, 0, 0.22);
`;

const DrawerIcon = styled(MenuOpenIcon)`
  width: auto;
  height: 40px;
`;

const NavbarLogo = styled.img`
  width: 260px;
  margin-left: 49.8%;
  margin-top: 1%;
  transform: translateX(-180px);
`;

const Greeting = styled.div`
  text-align: center;
  padding: 1em;
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
  margin: 1.5em;
  font-size: 1.1em;
`;

const QuotaMessage = styled.div`
  text-align: center;
  padding: 1.5em;
  font-size: 0.9em;
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
// const EXTENSION_URL = "https://github.com/LHL-FocusPocus/FocusPocus/releases"
const EXTENSION_URL =
  "https://chrome.google.com/webstore/detail/focus-pocus-extension/ognhkeempdpgnfkliplegljejeakonlg/";
export default function Navbar({ user, quota, setDashboard }: Props) {
  const classes = useStyles();
  const history = useHistory();

  const { first_name, picture } = user;
  const humanizeDurationOptions = {
    units: ["h", "m"],
    delimiter: " and ",
    round: true,
  };

  // Humanize time in more readable format given by quota data
  const used_quota = humanizeDuration(
    quota.used.minutes * 60000,
    humanizeDurationOptions as any
  );

  const allotment = humanizeDuration(
    quota.allotment.minutes * 60000,
    humanizeDurationOptions as any
  );

  const [state, setState] = useState({
    FocusPocus: false
  });

  const toggleDrawer = (anchor: string, open: boolean) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleLogout = function () {
    axios
      .post("/api/user/logout")
      .then(res => {
        setDashboard();
        history.push("/logout");
      })
      .catch(e => {
        console.error(e);
      });
  };

  const list = (anchor: string) => (
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
        <a href={EXTENSION_URL} target="_blank" className={classes.anchor}>
          <ListItem
            button
            key="extension"
            // component={Link}
            // linkButton={true}
            // target="_blank"
            // to="http://chrome.google.com/webstore/detail/focus-pocus-extension/ognhkeempdpgnfkliplegljejeakonlg/"
          >
            <ListItemIcon>
              <ExtensionIcon />
            </ListItemIcon>
            <ListItemText primary="Get Extension" />
          </ListItem>
        </a>
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
    </div>
  );
}
