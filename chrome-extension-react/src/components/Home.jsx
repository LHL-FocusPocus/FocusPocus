import React from "react";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useFormFields } from "../hooks/useFormFields";
import styled from "styled-components";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    // POST request
    setLoading(false);
  };

  return (
    <Wrapper className={classes.main} component="main" maxWidth="xs">
      <div className={classes.paper}>
        Today's Quota
        <Typography component="h1" variant="h5">
          10 minutes / 2 hours
        </Typography>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className={classes.form}
          noValidate
        >
          Currently Browsing
          <Typography component="h1" variant="h5">
            reddit.com
          </Typography>
          for
          <Typography component="h1" variant="h5">
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
            Add to Blacklist
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
