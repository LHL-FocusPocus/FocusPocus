import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import PendingFriends from "./PendingFriends";
import useFormFields from "../hooks/useFormFields";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const Container = styled.div`
  max-width: 400px;
  flex: 1;
  justify-content: center;
  display: flex;
`;

export default function Friends() {
  const classes = useStyles();
  // Controlled Component

  const [friend, setFriend] = useFormFields();

  const handleSubmit = event => {
    event.preventDefault();

    console.log("fields.friend :>> ", friend);
    console.log("addFriend :>> ", addFriend);

    addFriend(friend);
  };

  const addFriend = friendEmail => {
    axios
      .post("/api/user/friends/add", friendEmail)
      .then(res => {
        console.log("res :>> ", res);
      })
      .catch(e => {
        console.log("e :>> ", e);
      });
  };

  return (
    <Container>
      <form onSubmit={e => handleSubmit(e)}>
        <FormControl className={classes.margin}>
          <div className={classes.margin}>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <AccountCircle />
              </Grid>
              <Grid item>
                <TextField
                  type="email"
                  onChange={setFriend}
                  id="friend"
                  label="Add Friend"
                />
              </Grid>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Grid>
          </div>
          <PendingFriends />
        </FormControl>
      </form>
    </Container>
  );
}
