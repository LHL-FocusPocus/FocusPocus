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

// import tileData from "./tileData";

const useStyles = makeStyles(theme => ({
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  image: {
    borderRadius: "100%",
    width: "70%",
    height: "60%",
    // left: "13%",
    // bottom: "10%",
    // marginLeft: "14%",
    // paddingRight: "auto",
  },
  // tileBar: {
  //   backgroundColor: "black",
  // },
  // website: {
  //   opacity: "isDragging ? 0.5 : 1",
  // }
}));

export default function TopBlacklistCards({ hostname, name, id }) {
  const classes = useStyles();

  const [{ isDragging }, drag] = useDrag({
    // Here is where you identify WHICH piece if being dragged
    item: { type: ItemTypes.CARD, hostname },
    // transforms state from DnD system into usable props for component
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  /* ref={drag} */
  return (
    <GridListTile ref={drag} key={id}>
      <img
        style={{
          opacity: "isDragging ? 0.5 : 1",
        }}
        className={classes.image}
        src={`//logo.clearbit.com/${hostname}`}
        alt={name}
      />
      <GridListTileBar
        style={{ backgroundColor: isDragging ? "blue" : "green" }}
        className={classes.tileBar}
        title={name}
        actionIcon={
          <IconButton aria-label={`${name}`} className={classes.icon}>
            <InfoIcon />
          </IconButton>
        }
      />
    </GridListTile>
  );
}
