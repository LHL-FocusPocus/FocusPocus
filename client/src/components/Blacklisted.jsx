import React from "react";
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
import {
  Input,
  InputLabel,
  FormHelperText,
  InputAdornment,
  Fab
} from "@material-ui/core";
import LanguageIcon from "@material-ui/icons/Language";

import styled from "styled-components";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";

const Container = styled(Box)`
  height: 100%;
  padding: 0 40%;
`;

const AddNew = styled(Card)`
  max-width: 345;
  text-align: center;
`;

const Logo = styled(Avatar)`
  height: 60px;
  width: 60px;
  ${"" /* margin: 5% 5%; */}
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

export default function Blacklisted({ blacklist }) {
  console.log("blacklist", blacklist);

  const blacklistList = blacklist.map(website => {
    return (
      <BlacklistedCards
        key={website.blacklists_id}
        hostname={website.hostname}
        name={website.name}
      />
    );
  });
  return (
    <Container>
      <AddNew>
        <Background>
          <CardHeader
            titleTypographyProps={{ variant: "h5" }}
            title="Add Site"
          />
        </Background>
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
            {/* <FormHelperText id="my-helper-text">
              Website Address
            </FormHelperText> */}
            <Add aria-label="settings">
              <Fab size="small" color="primary" aria-label="add">
                <AddIcon />
              </Fab>
            </Add>
          </Form>
        </CardContent>
      </AddNew>
      {blacklistList}
    </Container>
  );
}

/* blacklists_id: 1
category: "Internet Media"
hostname: "reddit.com"
name: "Reddit"
user_id: 1
website_id: 1
 */
