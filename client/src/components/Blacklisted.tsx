import React from "react";
import { useState, useContext } from "react";
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
  Input,
  InputLabel,
  InputAdornment,
  Fab,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import LanguageIcon from "@material-ui/icons/Language";
import useFormFields from "../hooks/useFormFields";
import removeProtocol from "../helpers/removeProtocol";
import isUrl from "../helpers/isUrl";
import { ItemTypes } from "../utils/constants";
import { CardContext } from "./Options";
import { useDrop } from "react-dnd";
// import {} from 'styled-components/cssprop';

interface Props {
  blacklisted: object[];
  disableBlacklistedSite: any;
  addBlacklistedSite: any;
}

const Container = styled.div`
  min-height: 86vh;
  padding: 0 1% 0 2%;
  width: 25%;
  padding-top: 20px;
  flex: 1;

  @media (max-width: 1300px) {
    flex: 1 100%;
    order: -1;
    width: 80%;
    justify-content: center;
    margin: auto;
    margin-bottom: 3em;
  }
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
}: Props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const { addTopSiteToUserBlacklist } = useContext(CardContext as any);
  const [error, setError] = useState(false);

  // To expand blacklist Add Site button
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [fields, handleFieldChange] = useFormFields({
    host_name: "",
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();

    // Do initial check using regex
    if (!isUrl(fields.host_name)) {
      return setError(true);
    }
    let inputUrl;
    // Check if input can be constructed into URL -> if not, setError (not in correct format)
    try {
      inputUrl = fields.host_name;
      if (!inputUrl.startsWith("http")) {
        // isUrl will say true if people forget to add http, but new URL needs http
        inputUrl = "http://" + inputUrl;
      }
      new URL(inputUrl);
    } catch {
      return setError(true);
    }

    setError(false);

    // Remove "http://" & "https://"
    const withoutProtocol = removeProtocol(inputUrl);

    // Add blacklisted site to user db
    addBlacklistedSite(withoutProtocol);
  };

  // React Drag and Drop
  // isOver -> if dragged element is over the droppable element
  const [{ isOver }, drop] = useDrop({
    // Drop accepts only type CARD
    accept: ItemTypes.CARD,
    // On drop, add site to user blacklist
    drop: (item: any, monitor) => addTopSiteToUserBlacklist(item.hostname),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  // List of user's blacklisted sites
  const blacklistList = blacklisted.map((website: any) => {
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
    <Container ref={drop}>
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
                  // TODO  - helper text not working now..?
                  // helperText={error ? "Must be a valid URL" : "URL"}
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
