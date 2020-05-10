import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import AssessmentIcon from '@material-ui/icons/Assessment';
import styled from "styled-components";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const Icon = styled.img`
  width: 100%;
`

const Greeting = styled.img`
  text-align: center;
`

export default function Navbar() {
  const classes = useStyles();
  const [state, setState] = useState({
    FocusPocus: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={classes.list
      }
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Icon src="/imgs/multitasking.jpg"></Icon>
      </List>
      <List>
        Hi, Matt. 
        {/* TODO: Make this dynamic based on user firstName */}
      </List>
      <Divider />
      <List>
        {["Options", "Analytics"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <SettingsIcon /> : <AssessmentIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />

    </div>
  );

  return (
    <div>
        <React.Fragment>
          <Button onClick={toggleDrawer("FocusPocus", true)}>FocusPocus</Button>
          <Drawer anchor={"FocusPocus"} open={state["FocusPocus"]} onClose={toggleDrawer("FocusPocus", false)}>
            {list("FocusPocus")}
          </Drawer>
        </React.Fragment>
      
    </div>
  );
}
