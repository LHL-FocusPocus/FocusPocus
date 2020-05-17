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

// import tileData from "./tileData";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    overflow: "hidden",
    flexDirection: "column",
    backgroundColor: theme.palette.background.paper,
    width: "20%",
  },
  gridList: {
    width: 350,
    height: 700,
  },
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

const Title = styled.h1`
  font-size: 1.5em;
  width: 80%;
  margin-left: 62px;
  margin-right: 100px;
`;

const NotCards = styled(GridListTile)`
  padding: 0;
  text-align: center;
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
    <div className={classes.root}>
      <Title>Top Blacklisted Sites</Title>
      <GridList cellHeight={180} className={classes.gridList}>
        <NotCards cols={2} style={{ height: "50px" }}>
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
        </NotCards>
        {topBlacklisted.map(tile => (
          <TopBlacklistCards
            key={tile.id}
            hostname={tile.hostname}
            name={tile.name}
          />
        ))}
      </GridList>
    </div>
  );
}