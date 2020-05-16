import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
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
    width: "70%",
    height: "95%",
    left: "13%",
    bottom: "10%"
    // marginLeft: "14%",
    // paddingRight: "auto",
  },
}));

// /**
//  * The example data is structured as follows:
//  *
//  * import image from 'path/to/image.jpg';
//  * [etc...]
//  *
const tileData = [
  {
    img: "//logo.clearbit.com/www.reddit.com",
    title: "Image",
  },
  {
    img: "//logo.clearbit.com/www.twitter.com",
    title: "Image",
  },
  {
    img: "//logo.clearbit.com/www.instagram.com",
    title: "Image",
  },
  {
    img: "//logo.clearbit.com/www.tv.com",
    title: "Image",
  },
  {
    img: "//logo.clearbit.com/www.facebook.com",
    title: "Image",
  },
  {
    img: "//logo.clearbit.com/www.reddit.com",
    title: "Image",
  },
  {
    img: "//logo.clearbit.com/www.instagram.com",
    title: "Image",
  },
  {
    img: "//logo.clearbit.com/www.instagram.com",
    title: "Image",
  },

];

export default function TitlebarGridList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
          <ListSubheader component="div">Top Blacklisted Sites</ListSubheader>
        </GridListTile>
        {tileData.map(tile => (
          <GridListTile key={tile.img}>
            <img className={classes.image} src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {tile.author}</span>}
              actionIcon={
                <IconButton
                  aria-label={`info about ${tile.title}`}
                  className={classes.icon}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
