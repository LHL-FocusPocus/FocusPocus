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
  console.log("SignUp Props =======>", props)
  
  const classes = useStyles();
  const { history } = props;

  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleSubmit = event => {
    event.preventDefault();

    const credentials = {
      email: fields.email,
      password: fields.password,
      firstName: fields.firstName,
      lastName: fields.lastName
    };

    axios
      .post("/api/user/register", credentials)
      .then((res) => {
        console.log(res)
        console.log("Successful login");
        history.push("/dashboard")
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
          Sign up
        </Typography>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className={classes.form}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                // name="firstName"
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
                // name="lastName"
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
                label="Email Address"
                // name="email"
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
                // name="password"
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
  );
}
