import React from "react";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  getCurrentTab,
  getCurrentTimer,
  recheckTab,
} from "../helpers/chromeHelpers";
import humanizeDuration from "humanize-duration";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: 10,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#6C63FF",
  },
  error: {
    color: "red",
    fontWeight: "bold",
  },
  title: {
    marginBottom: 20,
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -10,
    marginLeft: -12,
  },
  buttonGroup: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
}));

const Wrapper = styled(Container)`
  margin: auto;
  z-index: 5;
  width: 350px;
  padding: 3em;
  text-align: center;
  background-color: white;
  border: 1px solid black;
  border-radius: 1em;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
`;

export default function Home(props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [currentDomain, setCurrentDomain] = useState("");
  const [blacklistDomains, setBlacklistDomains] = useState([]);
  const [timerInSeconds, setTimerInSeconds] = useState(0);
  const [firstName, setFirstName] = useState("");

  const getDomain = () => {
    getCurrentTab(tab => {
      try {
        const url = new URL(tab.url);
        const domain = url.hostname.split("www.").join("");
        setCurrentDomain(domain);
      } catch (error) {
        setCurrentDomain("");
      }
    });
  };

  const runTimer = () => {
    getCurrentTimer(time => {
      setTimerInSeconds(time);
      setInterval(() => {
        setTimerInSeconds(prev => prev + 1);
      }, 1000);
    });
  };

  const getBlacklist = () => {
    setLoading(true);
    return axios
      .get("/api/data/dashboard")
      .then(response => {
        const blacklist = response.data.blacklisted.map(obj => obj.hostname);
        setBlacklistDomains(blacklist);
        setFirstName(response.data.user.first_name);
        setLoading(false);
      })
      .catch(err => {
        setBlacklistDomains([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    getDomain();
    getBlacklist();
    runTimer();
  }, []);

  const isDomainBlocked = () => {
    return blacklistDomains.includes(currentDomain);
  };

  const addToBlacklist = () => {
    setLoading(true);
    return axios
      .post("/api/user/blacklists/add", { host_name: currentDomain })
      .then(res => {
        props.getUserData();
        setErrorMsg("");
        recheckTab();
        setLoading(false);
      })
      .catch(err => {
        setErrorMsg("Something went wrong!");
        setLoading(false);
      });
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (currentDomain) {
      addToBlacklist();
    }
  };

  const {
    quota_today: {
      allotment: { minutes: allotment_minutes },
      used: { minutes: used_minutes },
    },
  } = props.userData;

  const shortEnglishHumanizer = humanizeDuration.humanizer({
    units: ["h", "m"],
    delimiter: " ",
    round: true,
    language: "shortEn",
    languages: {
      shortEn: {
        y: () => "y",
        mo: () => "mo",
        w: () => "w",
        d: () => "d",
        h: () => "h",
        m: () => "m",
        s: () => "s",
        ms: () => "ms",
      },
    },
  });

  return (
    <Wrapper className={classes.main} component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography variant="h6" className={classes.title}>
          FocusPocus Tracker
        </Typography>
        <Typography variant="subtitle1" className={classes.title}>
          {isDomainBlocked()
            ? `Don't stay on this page for too long, ${firstName}!`
            : `Keep up the good work, ${firstName}!`}
        </Typography>
        Today's Quota Usage
        <Typography
          component="h2"
          variant="subtitle1"
          className={used_minutes > allotment_minutes && classes.error}
        >
          {shortEnglishHumanizer(used_minutes * 60000)}
        </Typography>
        of
        <Typography component="h2" variant="subtitle1">
          {shortEnglishHumanizer(allotment_minutes * 60000)}
          <hr />
        </Typography>
        <form
          onSubmit={e => handleSubmit(e)}
          className={classes.form}
          noValidate
        >
          Currently Browsing
          <Typography component="h2" variant="subtitle1">
            {currentDomain}
          </Typography>
          for
          <Typography component="h2" variant="subtitle1">
            {shortEnglishHumanizer(timerInSeconds * 1000, {
              language: "en",
              units: ["h", "m", "s"],
            })}
          </Typography>
          {`Blacklisted domains: ${blacklistDomains.length}`}
          <Grid className={classes.buttonGroup}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading || isDomainBlocked()}
            >
              {isDomainBlocked()
                ? "Already Blacklisted"
                : "Add Domain to Blacklist"}
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </Grid>
          <Grid container justify="center">
            <Grid item>
              <p className={classes.error}>{errorMsg}</p>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item>
              <Link
                href="http://localhost:3000/dashboard"
                variant="body2"
                target="_blank"
              >
                For more stats, visit your dashboard!
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Wrapper>
  );
}
