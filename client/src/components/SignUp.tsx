import React, { useState } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  Link,
  TextField,
  CssBaseline,
  Button,
  Container,
} from "@material-ui/core";
import useFormFields from "../hooks/useFormFields";
import validEmail from "../helpers/validEmail";
import axios from "axios";

interface Props {
  setDashboard: any;
  history: any;
}

interface ErrorState {
  email?: boolean;
  password?: boolean;
}

interface Credentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

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
    width: "100%",
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
  width: 57%;
  transform: translateY(-2em);
`;

const LoginWrapper = styled.div`
  flex: 1;
  margin-right: 7%;
  display: flex;
  margin-top: 1%;
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

export default function SignUp({ history, setDashboard }: Props) {
  const classes = useStyles();

  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  } as Credentials);
  
  const [error, setError] = useState(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (!validEmail(fields.email)) {
      return setError(true);
    }

    setError(false);

    const credentials = {
      email: fields.email,
      password: fields.password,
      firstName: fields.firstName,
      lastName: fields.lastName,
    };

    axios
      .post("/api/user/register", credentials)
      .then(() => {
        setDashboard()
          .then(() => {
            history.push("/dashboard");
          })
          .catch((error: any) => {
            console.error(error.response);
          });
      })
      .catch(error => {
        console.error(error.response);
      });
  };

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  return (
    <LoginWrapper>
      <Wrapper maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Img src="/imgs/magic-trick.png" alt="landing image"></Img>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form
            onSubmit={e => handleSubmit(e)}
            className={classes.form}
            noValidate
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={fields.firstName}
                  autoFocus
                  onChange={handleFieldChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  value={fields.lastName}
                  autoComplete="lname"
                  onChange={handleFieldChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  error={error}
                  helperText={error ? "Not a valid email" : ""}
                  value={fields.email}
                  autoComplete="email"
                  onChange={handleFieldChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  value={fields.password}
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
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
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
