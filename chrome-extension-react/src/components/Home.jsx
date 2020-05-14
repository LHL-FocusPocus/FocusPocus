import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(() => ({
  quota: {
    height: 300,
    width: 240,
  },
  status: {
    height: 300,
    width: 140,
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <Grid container justify="center" spacing={2}>
        <Grid key={1} item>
          <Paper className={classes.quota}> Test </Paper>
        </Grid>
        <Grid key={1} item>
          <Paper className={classes.status} />
        </Grid>
      </Grid>
    </Grid>
  );
}
