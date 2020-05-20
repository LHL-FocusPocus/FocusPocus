import React, { useState, useContext } from "react";
import BlacklistedCards from "./BlacklistedCards";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import AddIcon from "@material-ui/icons/Add";
import Collapse from "@material-ui/core/Collapse";
import clsx from "clsx";
import useFormFields from "../hooks/useFormFields";
import removeProtocol from "../helpers/removeProtocol";
import axios from "axios";
import FormControl from "@material-ui/core/FormControl";
import { ItemTypes } from "../utils/constants";
import { CardContext } from "./Options";

import {
  Input,
  InputLabel,
  FormHelperText,
  InputAdornment,
  Fab,
  TextField,
} from "@material-ui/core";
import LanguageIcon from "@material-ui/icons/Language";
import styled from "styled-components";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { useDrop } from "react-dnd";

const Container = styled(Box)`
  min-height: 86vh;
  padding: 0 1% 0 2%;
  width: 25%;
  padding-top: 20px;
  flex: 1 ${"" /* transform: translateX(22%) */};
`;

const AddNew = styled(Card)`
  text-align: center;
  width: 100%;
`;

const Background = styled(CardActionArea)`
  background-color: rgba(71, 65, 87, 0.055);
  width: 100%;
`;

const Add = styled(Fab)`
  margin: 5% 20%;
`;

const Form = styled.form`
  width: 100%;
  padding: 0;
`;

const Title = styled.h1`
  text-align: center;
  margin-top: 0;
  transform: translateY(-20%);
  font-size: 3em;
`;

const useStyles = makeStyles(theme => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    // transform: "rotate(180deg)",
  },
  border: {
    // border: "2px solid black",
    // border: "3px solid transparent",
    // borderImage: "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)",
    // borderImageSlice: 1,
    boxShadow: "5px 5px 15px black",
    //filter: "blur(5px)",
    transform: "scaleY(1.02) scaleX(1.02)",
  },
  regular: {
    border: "3x solid transparent",
    borderImageSlice: 1,
  },
  fullwidth: { width: "100%" },
  inputwidth: { width: "80%" },
}));

export default function Blacklisted({
  blacklisted,
  disableBlacklistedSite,
  addBlacklistedSite,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const { addTopSiteToUserBlacklist } = useContext(CardContext);
  const [error, setError] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [fields, handleFieldChange] = useFormFields({
    host_name: "",
  });

  const handleSubmit = event => {
    event.preventDefault();

    if (!isUrl(fields.host_name)) return setError(true);

    try {
      new URL(fields.host_name);
    } catch {
      return setError(true);
    }

    setError(false);

    const withoutProtocol = removeProtocol(fields.host_name);

    addBlacklistedSite(withoutProtocol);
  };

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => addTopSiteToUserBlacklist(item.hostname),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  // Prevents app from crashing when user has no blacklisted sites
  const blacklistList = blacklisted.map(website => {
    return (
      <BlacklistedCards
        deleteSite={disableBlacklistedSite}
        key={website.website_id}
        hostname={website.hostname}
        name={website.name}
        id={website.website_id}
      />
    );
  });

  return (
    <Container ref={drop} style>
      <Title>Blacklist</Title>
      <AddNew>
        <Background>
          <CardHeader
            titleTypographyProps={{ variant: "h5" }}
            title="Add Site"
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="Add Site"
          />
        </Background>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <FormControl className={classes.fullwidth}>
              <Form
                className={classes.fullwidth}
                onSubmit={e => handleSubmit(e)}
              >
                <InputLabel htmlFor="New Website" />
                <Input
                  className={classes.inputwidth}
                  error={error}
                  helperText={error ? "Must be a valid URL" : "URL"}
                  required
                  id="host_name"
                  value={fields.host_name}
                  onChange={handleFieldChange}
                  startAdornment={
                    <InputAdornment position="start">
                      <LanguageIcon />
                    </InputAdornment>
                  }
                />
                <Add
                  type="submit"
                  size="small"
                  color="primary"
                  aria-label="add"
                >
                  <AddIcon />
                </Add>
              </Form>
            </FormControl>
          </CardContent>
        </Collapse>
      </AddNew>
      <div className={isOver ? classes.border : "regular"}>{blacklistList}</div>
    </Container>
  );
}
