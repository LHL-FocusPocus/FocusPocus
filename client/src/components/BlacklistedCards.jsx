import React from "react";
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

// STRETCH: make cards draggable/droppable to delete?

const Logo = styled(Avatar)`
  height: 60px;
  width: 60px;
  ${"" /* margin: 5% 5%; */}
`;

const Container = styled(Card)`
  max-width: 345;
  text-align: center;
`;

// const Website = styled(CardHeader)`
//   ${"" /* padding-bottom: 10%; */}
//   ${"" /* transform: translateY(-100%) */}
//   ${
//     "" /* width: 20%;
//   text-align: center;
//   margin-left: 40%;
//   padding-bottom: 50%; */
//   }
//   font-size: 2em;
// `;

const Background = styled(CardActionArea)`
  background-color: rgba(71, 65, 87, 0.055);
`;

const Delete = styled(IconButton)`
  margin-left: 85%;
`;

export default function BlacklistedCards({ hostname, name }) {
  return (
    <Container>
      <Background>
        <CardHeader
          avatar={
            <Logo
              aria-label="website"
              src={`//logo.clearbit.com/${hostname}`}
            />
          }
          titleTypographyProps={{ variant: "h5" }}
          title={`${name}`}
        />
        {/* <Logo image={`//logo.clearbit.com/${hostname}`} title={`${name}`} />
        <Website>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
        </Website> */}
      </Background>
      <CardActions>
        {/* <Delete size="small" color="primary"> */}
        <Delete>
          <DeleteIcon/>
        </Delete>
        {/* </Delete> */}
      </CardActions>
    </Container>
  );
}
