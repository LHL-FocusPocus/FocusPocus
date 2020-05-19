import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import styled from "styled-components";

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

export default function InputWithIcon() {
  const classes = useStyles();

  return (
    <Container>
      <FormControl className={classes.margin}>
        <div className={classes.margin}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <AccountCircle />
            </Grid>
            <Grid item>
              <TextField id="input-with-icon-grid" label="Add Friend" />
            </Grid>
          </Grid>
        </div>
      </FormControl>
    </Container>
  );
}
