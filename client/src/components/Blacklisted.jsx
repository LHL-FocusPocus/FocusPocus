import React, { useState } from "react";
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
import axios from "axios";

import {
  Input,
  InputLabel,
  FormHelperText,
  InputAdornment,
  Fab,
} from "@material-ui/core";
import LanguageIcon from "@material-ui/icons/Language";
import styled from "styled-components";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";

const Container = styled(Box)`
  min-height: 86vh;
  padding: 0 40%;
`;

const AddNew = styled(Card)`
  max-width: 345;
  text-align: center;
`;

const Background = styled(CardActionArea)`
  background-color: rgba(71, 65, 87, 0.055);
`;

const Add = styled(IconButton)`
  width: 20%;
  margin: 3% 40%;
`;

const Form = styled(FormControl)`
  width: 100%;
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
}));

export default function Blacklisted({ blacklisted, disableBlacklistedSite }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [fields, handleFieldChange] = useFormFields({
    website: "",
  });

  const handleSubmit = event => {
    event.preventDefault();

    const credentials = {
      email: fields.email,
      password: fields.password,
    };

    axios
      .post("/api/blacklists/add/:id", credentials)
      .then(res => {
        console.log(res);
        console.log("Successful login");
      })
      .catch(e => {
        console.error(e);
      });
  };

  // Prevents app from crashing when user has no blacklisted sites
  let blacklistList;
  if (blacklisted) {
    blacklistList = blacklisted.map(website => {
      return (
        <BlacklistedCards
          deleteSite={disableBlacklistedSite}
          key={website.blacklists_id}
          hostname={website.hostname}
          name={website.name}
          id={website.website_id}
        />
      );
    });
  }

  return (
    <Container>
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
            aria-label="show more"
          />
        </Background>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Form>
              <InputLabel htmlFor="my-input" />
              <Input
                id="my-input"
                aria-describedby="my-helper-text"
                startAdornment={
                  <InputAdornment position="start">
                    <LanguageIcon />
                  </InputAdornment>
                }
              />
              <Add aria-label="settings">
                <Fab size="small" color="primary" aria-label="add">
                  <AddIcon />
                </Fab>
              </Add>
            </Form>
          </CardContent>
        </Collapse>
      </AddNew>
      {blacklistList}
    </Container>
  );
}
