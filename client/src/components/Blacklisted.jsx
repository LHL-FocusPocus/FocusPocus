import React, { useState, useContext } from "react";
import BlacklistedCards from "./BlacklistedCards";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import {
  FormControl,
  Collapse,
  CardContent,
  CardActionArea,
  CardHeader,
  Card,
  Box,
  Input,
  InputLabel,
  InputAdornment,
  Fab,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import LanguageIcon from "@material-ui/icons/Language";
import useFormFields from "../hooks/useFormFields";
import removeProtocol from "../helpers/removeProtocol";
import { ItemTypes } from "../utils/constants";
import { CardContext } from "./Options";
import { useDrop } from "react-dnd";

const Container = styled(Box)`
  min-height: 86vh;
  padding: 0 1% 0 2%;
  width: 25%;
  padding-top: 20px;
  flex: 1;
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
  border: {
    boxShadow: "5px 5px 15px black",
    transform: "scaleY(1.02) scaleX(1.02)",
  },
  regular: {
    border: "3x solid transparent",
    borderImageSlice: 1,
  },
  fullwidth: { width: "100%" },
  inputwidth: { width: "55%", fontSize: 25 },
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
