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
import BlacklistDraggable from "./BlacklistDraggable";
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
    width: 500,
    height: 800,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  image: {
    borderRadius: "100%",
    // width: "70%",
    // height: "95%",
    // left: "13%",
    // bottom: "10%",
    // marginLeft: "14%",
    // paddingRight: "auto",
  },
  tileBar: {
    backgroundColor: "black",
  },
  // website: {
  //   opacity: "isDragging ? 0.5 : 1",
  // }
}));

export default function TopBlacklisted({ topBlacklisted }) {
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
        {topBlacklisted.map(tile => (
          <BlacklistDraggable
            key={tile.name}
            hostname={tile.hostname}
            name={tile.name}
            id={tile.hostname}
           /> 

        ))}
      </GridList>
    </div>
  );
}
