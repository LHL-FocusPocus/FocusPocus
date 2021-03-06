import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import {
  Container,
  Typography,
  TextField,
  Link,
  CssBaseline,
  Button,
  Grid,
} from "@material-ui/core";
import useFormFields from "../hooks/useFormFields";
import validEmail from "../helpers/validEmail";
import axios from "axios";

const useStyles = makeStyles(theme => ({
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
}));

const Wrapper = styled(Container)`
  border: 0.5px solid slategrey;
  border-radius: 1em;
  padding: 2em;
  z-index: 5;
  background-color: white;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
`;

const Img = styled.img`
  width: 90%;
  transform: translateY(-2em);
`;

const LoginWrapper = styled.div`
  flex: 1;
  margin-right: 7%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 1300px) {
    margin: auto;
    margin-bottom: 2em;
  }
`;

const PrivacyPolicy = styled.a`
  font-size: 0.9em;
  color: white;
  text-decoration: none;
  margin-top: 2%;
`;

export default function Login({ setDashboard, history }) {
  const classes = useStyles();

  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: false,
    password: false,
  });

  const handleSubmit = event => {
    event.preventDefault();

    if (!validEmail(fields.email)) {
      return setError({ email: true });
    }

    const credentials = {
      email: fields.email,
      password: fields.password,
    };

    axios
      .post("/api/user/login", credentials, { withCredentials: true })
      .then(() => {
        setError({ email: false, password: false });
        setDashboard().then(() => {
          history.push("/dashboard");
        });
      })
      .catch(error => {
        if (error.response.status === 401) {
          return setError({ password: true });
        }
      });
  };

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  return (
    <LoginWrapper>
      <Wrapper className={classes.main} component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Img src="/imgs/landing.png" alt="landing image"></Img>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <form
            onSubmit={e => handleSubmit(e)}
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
                  type="email"
                  error={error.email}
                  helperText={error.email ? "Must be a valid email" : ""}
                  value={fields.email}
                  label="Email Address"
                  autoComplete="email"
                  onChange={handleFieldChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  error={error.password}
                  helperText={error.password ? "Incorrect Password" : ""}
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
              disabled={!validateForm()}
            >
              Log In
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/register" variant="body2">
                  Don't have an account? Sign up
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Wrapper>
      <PrivacyPolicy href="https://www.termsfeed.com/live/8d4503cc-2341-4052-8309-1dddf62a5750">
        Privacy Policy
      </PrivacyPolicy>
    </LoginWrapper>
  );
}
