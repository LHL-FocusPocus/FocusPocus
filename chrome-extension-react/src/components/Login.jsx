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
import CircularProgress from '@material-ui/core/CircularProgress';

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
  margin-top: 2em;
  z-index: 5;
  width: 350px;
  padding: 3em;
  text-align: center;
  background-color: white;
  border: 1px solid black;
  border-radius: 1em;
`;

export default function Login(props) {
  const classes = useStyles();

  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const credentials = {
      email: fields.email,
      password: fields.password,
    };

    setLoading(true);
    axios
      .post("/api/user/login", credentials, { withCredentials: true })
      .then((res) => {
        setErrorMsg("");
        setLoading(false);
      })
      .catch((e) => {
        if (e.response) {
          setErrorMsg("Failed to login, please try again!");
        } else {
          setErrorMsg("FocusPocus servers are down, please try again later!");
        }
        setLoading(false);
      });
  };

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  return (
    <Wrapper className={classes.main} component="main" maxWidth="xs">
      <div className={classes.paper}>
        {/* <Img src="/images/clock.png" alt="landing image"></Img> */}
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className={classes.form}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                value={fields.email}
                label="Email Address"
                // name="email"
                autoComplete="email"
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                // name="password"
                label="Password"
                value={fields.password}
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleFieldChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!validateForm() || loading}
          >
            Log In
          </Button>
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          <Grid container justify="flex-end">
            <Grid item>
              <p className={classes.error}>{errorMsg}</p>
            </Grid>
          </Grid>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/register" variant="body2">
                Don't have an account? Visit our website!
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Wrapper>
  );
}
