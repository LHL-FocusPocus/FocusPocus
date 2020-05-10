import React from "react";
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
import { Redirect } from "react-router"
import { useHistory } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:9000";

const useStyles = makeStyles(theme => ({
  main: {
    marginLeft: -30,
  },
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
  border: 1px solid black;
  border-radius: 1em;
  padding: 2em;
  z-index: 5;
  background-color: white;
`;

const Img = styled.img`
  width: 100%;
  transform: translateY(-2em);
`;

export default function SignUp(props) {
  const classes = useStyles();
  // const { history } = props;

  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
  });

  const handleSubmit = event => {
    event.preventDefault();

    const credentials = {
      email: fields.email,
      password: fields.password,
    };

    axios
      .post("/api/login", credentials)
      .then(() => {
        console.log("Successful login")
        // history.push("/register") TODO: how to redirect after successful login?
      })
      .catch(e => {
        console.error(e);
      });
  };

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  return (
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
  );
}
