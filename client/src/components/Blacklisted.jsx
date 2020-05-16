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
import removeProtocol from "../helpers/removeProtocol";
import axios from "axios";
import FormControl from "@material-ui/core/FormControl";

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

const Container = styled(Box)`
  min-height: 86vh;
  padding: 0 10%;
  width: 25%;
  ${'' /* transform: translateX(22%) */}
`;

const AddNew = styled(Card)`
  max-width: 345;
  text-align: center;
`;

const Background = styled(CardActionArea)`
  background-color: rgba(71, 65, 87, 0.055);
`;

const Add = styled(Fab)`
  margin: 5% 44%;
`;

const Form = styled.form`
  width: 100%;
  padding: 0;
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

export default function Blacklisted({
  blacklisted,
  disableBlacklistedSite,
  addBlacklistedSite,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [fields, handleFieldChange] = useFormFields({
    host_name: "",
  });

  const handleSubmit = event => {
    event.preventDefault();

    const withoutProtocol = removeProtocol(fields.host_name);

    addBlacklistedSite(withoutProtocol);
  };

  // Prevents app from crashing when user has no blacklisted sites
  let blacklistList;
  if (blacklisted) {
    blacklistList = blacklisted.map(website => {
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
            aria-label="Add Site"
          />
        </Background>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <FormControl>
              <Form onSubmit={e => handleSubmit(e)}>
                <InputLabel htmlFor="New Website" />
                <Input
                  required
                  id="host_name"
                  value={fields.host_name}
                  // type="url"
                  onChange={handleFieldChange}
                  // aria-describedby="my-helper-text"
                  // InputProps={{
                  //   startAdornment: (
                  //     <InputAdornment position="start">
                  //       <LanguageIcon />
                  //     </InputAdornment>
                  //   ),
                  // }}
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
      {blacklistList}
    </Container>
  );
}
