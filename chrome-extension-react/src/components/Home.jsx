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
import { getCurrentTab } from "../helpers/chromeHelpers";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#6C63FF",
  },
  error: {
    color: "red",
  },
  title: {
    marginBottom: 20,
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
`;

export default function Home(props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [domain, setDomain] = useState("");

  const getDomain = () => {
    getCurrentTab((tab) => {
      try {
        const url = new URL(tab.url);
        const domain = url.hostname.split("www.").join("");
        setDomain(domain);
      } catch (error) {
        setDomain("Unknown");
      }
    });
  };

  useEffect(() => {
    getDomain();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    // POST request
    setLoading(false);
  };
  const {
    quota_today: {
      allotment: { hours: quota_allotment_hours },
      used: { minutes: used_minutes },
    },
  } = props.userData;

  return (
    <Wrapper className={classes.main} component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography variant="h5" className={classes.title}>
          FocusPocus Tracker
        </Typography>
        Today's Quota Usage
        <Typography component="h2" variant="h6">
          {used_minutes} minutes
        </Typography>
        of
        <Typography component="h2" variant="h6">
          {quota_allotment_hours} hours
          <hr />
        </Typography>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className={classes.form}
          noValidate
        >
          Currently Browsing
          <Typography component="h2" variant="h6">
            {domain}
          </Typography>
          for
          <Typography component="h2" variant="h6">
            18 minutes
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            Add Domain to Blacklist
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
          <Grid container justify="center">
            <Grid item>
              <p className={classes.error}>{errorMsg}</p>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item>
              <Link href="/register" variant="body2">
                Link to something
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Wrapper>
  );
}
