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
import styled from "styled-components";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";

const Container = styled(Box)`
  height: 80vh;
  padding: 0 40%;
`;

const addNew = styled(Card)`
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

const Delete = styled(IconButton)`
  margin-top: 27%;
  margin-right: 20%;
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
      <addNew>
        <Background>
          <CardHeader
            titleTypographyProps={{ variant: "h5" }}
            title="Add Site"
            action={
              <Delete aria-label="settings">
                <DeleteIcon />
              </Delete>
            }
          />
        </Background>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites"></IconButton>
          <IconButton aria-label="share"></IconButton>
        </CardActions>
      </addNew>
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
