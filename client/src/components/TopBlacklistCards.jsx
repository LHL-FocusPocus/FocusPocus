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
import styled from "styled-components";

const useStyles = makeStyles(theme => ({
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

const WebsiteTitle = styled(GridListTileBar)`
  text-align: center;
  background: linear-gradient(#e66465, #9198e5);
`;

const Icon = styled.img`
  border-radius: 100%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 46%;
  ${'' /* transform: translateY(-5px) */}
`;

const Card = styled(GridListTile)`
  width: 50%;
  padding: 0.2em;
  margin-bottom: 0.8em;
`;

export default function TopBlacklistCards({ hostname, name, id }) {
  const classes = useStyles();

  const [{ isDragging }, drag] = useDrag({
    // Here is where you identify WHICH piece is being dragged
    item: { type: ItemTypes.CARD, hostname },
    // transforms state from DnD system into usable props for component
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  /* ref={drag} */
  return (
    <Card key={name} ref={drag}>
      <Icon
        style={{
          opacity: isDragging ? 0.4 : 1,
        }}
        className={classes.image}
        src={`//logo.clearbit.com/${hostname}`}
        alt={name}
      />
      <WebsiteTitle
        style={{ opacity: isDragging ? 0.4 : 1 }}
        className={classes.tileBar}
        title={name}
        // actionIcon={
        //   <IconButton aria-label={`${name}`} className={classes.icon}>
        //     <InfoIcon />
        //   </IconButton>
        // }
      />
    </Card>
  );
}
