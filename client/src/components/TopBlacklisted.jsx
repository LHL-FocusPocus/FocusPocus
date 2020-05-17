import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../utils/constants";
import TopBlacklistCards from "./TopBlacklistCards";
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
    height: 800,
  },
}));

export default function TopBlacklisted({ topBlacklisted }) {
  // const [{ isDragging }, drag] = useDrag({
  //   // Here is where you identify WHICH piece if being dragged
  //   item: { type: ItemTypes.CARD, id },
  //   // transforms state from DnD system into usable props for component
  //   collect: monitor => ({
  //     isDragging: !!monitor.isDragging(),
  //   }),
  // });
  const classes = useStyles();

  // 1 -> props object ; contains properties collected from DnD system
  // 2 -> ref function; attach DOM elements to react-dnd
  // const [{ isDragging }, drag] = useDrag({
  //   // Here is where you identify WHICH piece if being dragged
  //   item: { type: ItemTypes.BLACKLISTED },
  //   // transforms state from DnD system into usable props for component
  //   collect: monitor => ({
  //     isDragging: !!monitor.isDragging(),
  //   }),
  // });

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
          <ListSubheader component="div">Top Blacklisted Sites</ListSubheader>
        </GridListTile>
        {/* {topBlacklisted.map((tile) => (
          <GridListTile>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              actionIcon={
                <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))} */}
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
