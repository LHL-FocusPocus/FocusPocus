import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { GridListTileBar, GridListTile } from "@material-ui/core";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../utils/constants";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  title: {
    color: theme.palette.common.black,
  },
  notDragging: {
    opacity: 1,
  },
  dragging: {
    opacity: 0,
    boxShadow: "none",
  },
}));

const WebsiteTitle = styled(GridListTileBar)`
  text-align: center;
  background: none;
`;

const Icon = styled.img`
  border-radius: 100%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 37%;
`;

const Card = styled(GridListTile)`
  margin: 0.5em;
  padding-top: 1em;
  box-shadow: 1px 1px 5px slategrey;
  flex-grow: 1;
`;

interface Props {
  name: string;
  hostname: string;
}

export default function TopBlacklistCards({ hostname, name }: Props) {
  const classes = useStyles();

  const [{ isDragging }, drag] = useDrag({
    // Here is where you identify WHICH piece is being dragged
    item: { type: ItemTypes.CARD, hostname },
    // Transforms state from DnD system into usable props for component
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Card
      className={clsx({
        [classes.dragging]: isDragging,
      })}
      key={name}
      ref={drag}
    >
      <Icon
        className={clsx({
          [classes.dragging]: isDragging,
        })}
        src={`//logo.clearbit.com/${hostname}`}
        alt={name}
      />
      <WebsiteTitle
        className={clsx({
          [classes.dragging]: isDragging,
        })}
        classes={{
          title: classes.title,
        }}
        title={name}
      />
    </Card>
  );
}
