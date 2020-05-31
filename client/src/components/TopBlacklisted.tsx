import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { Typography, Popover, IconButton, GridList } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import TopBlacklistCards from "./TopBlacklistCards";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    height: 600,
    width: 350,
    alignSelf: "center",
  },
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

const Title = styled.h1`
  font-size: 2em;
  text-align: center;
`;

const Popup = styled.div`
  text-align: center;
  margin-bottom: 1em;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  overflow: hidden;
  flex: 1;

  @media (max-width: 1300px) {
    order: 2;
    margin-bottom: 3em;
  }
`;

export default function TopBlacklisted({ topBlacklisted }: any) {
  const [anchorEl, setAnchorEl] = useState(null);

  const classes = useStyles();

  const handlePopoverOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Container className={classes.root}>
      <Title>Top Blacklisted Sites</Title>
      <Popup>
        <IconButton
          aria-owns={open ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          aria-label={`test`}
        >
          <InfoIcon />
        </IconButton>

        <Popover
          id="mouse-over-popover"
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography>Drag and Drop to Blacklist</Typography>
        </Popover>
      </Popup>

      <GridList cellHeight={180} className={classes.gridList}>
        {topBlacklisted.map(
          (tile: { id: number; hostname: string; name: string }) => (
            <TopBlacklistCards
              key={tile.id}
              hostname={tile.hostname}
              name={tile.name}
            />
          )
        )}
      </GridList>
    </Container>
  );
}
