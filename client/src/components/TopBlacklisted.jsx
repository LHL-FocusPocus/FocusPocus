import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../utils/constants";
import TopBlacklistCards from "./TopBlacklistCards";
import styled from "styled-components";
import InfoIcon from "@material-ui/icons/Info";
import Tooltip from "@material-ui/core/Tooltip";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

// import tileData from "./tileData";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 383,
    height: 700,
  },
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

const Title = styled(ListSubheader)`
  font-size: 1.5em;
  text-align: center;
`;

const Popup = styled.div`
  text-align: center;
  margin-bottom: 2em;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
  overflow: hidden;
`;

export default function TopBlacklisted({ topBlacklisted }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const classes = useStyles();

  const handlePopoverOpen = event => {
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
            vertical: "right",
            horizontal: "center",
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography>Drag and Drop to Blacklist</Typography>
        </Popover>
      </Popup>
      <GridList cellHeight={180} className={classes.gridList}>
        {topBlacklisted.map(tile => (
          <TopBlacklistCards
            key={tile.id}
            hostname={tile.hostname}
            name={tile.name}
          />
        ))}
      </GridList>
    </Container>
  );
}

/* 
        {topBlacklisted.map(tile => (
          <GridListTile
            key={tile.id}
            hostname={tile.hostname}
            name={tile.name}
            id={tile.hostname}
            ref={drag}
            key={tile.name}
          >
            <img
              style={{
                opacity: "isDragging ? 0.5 : 1",
              }}
              className={classes.image}
              src={`//logo.clearbit.com/${tile.hostname}`}
              alt={tile.name}
            />
            <GridListTileBar
              style={{ backgroundColor: isDragging ? "blue" : "green" }}
              className={classes.tileBar}
              title={tile.name}
              actionIcon={
                <IconButton
                  aria-label={`${tile.name}`}
                  className={classes.icon}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))} */