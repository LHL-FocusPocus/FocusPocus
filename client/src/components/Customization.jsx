import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import styled from "styled-components";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import useFormFields from "../hooks/useFormFields";
import axios from "axios";
import { Input } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  },
}));

const Title = styled.h1`
  font-size: 2em;
  text-align: center;
`;

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 65%;
  margin: auto;
`;

const Wrapper = styled(Box)`
  display: flex;
`;
const PaddedTextField = styled(TextField)`
  margin: 0.5em;
`;
const ButtonContainer = styled(Box)`
  flex: 1;
  align-items: center;
  ${"" /* flex-direction: columm; */}
  justify-content: flex-end;
`;

const CustomizeButton = styled(Button)`
  ${"" /* align-self: center; */}
  ${"" /* flex: 1; */}
  width: 100%;
  margin: 0.5em;
`;

export default function Customization({ userOptions }) {
  const classes = useStyles();
  const [options, handleOptionsChange] = useFormFields({
    word: userOptions.noun,
    image: userOptions.imageUrl,
    video: userOptions.videoUrl,
  });
  const [error, setError] = useState({
    image: false,
    video: false,
  });

  const handleSubmit = event => {
    event.preventDefault();

    // Extension needs urls that start with http, so make sure that they're included with URL constructor
    if (options.image) {
      try {
        new URL(options.image);
      } catch {
        return setError({ image: true });
      }
    }

    if (options.video) {
      try {
        new URL(options.video);
      } catch {
        return setError({ video: true });
      }
    }

    const userOptions = {
      word: options.word,
      image: options.image,
      video: options.video,
    };

    setError({ image: false, video: false });

    axios
      .post("/api/user/options/add", userOptions)
      .then(el => {
        console.log("el :>> ", el);
        // setDashboard().then(() => {
        //   history.push("/dashboard");
      })
      .catch(e => {
        console.error(e);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={classes.root}
      noValidate
      autoComplete="off"
    >
      <Title>Customize Your Replacements</Title>
      <Wrapper>
        <FormContainer>
          <div>
            <PaddedTextField
              label="Word"
              variant="outlined"
              helperText="New Noun"
              id="word"
              fullWidth={true}
              value={options.word || ""}
              onChange={handleOptionsChange}
            />
            <PaddedTextField
              label="Image"
              variant="outlined"
              helperText="Image URL"
              fullWidth={true}
              id="image"
              error={error.image}
              helperText={error.image ? "Must be a valid URL" : "Image URL"}
              value={options.image || ""}
              onChange={handleOptionsChange}
            />

            <PaddedTextField
              label="Video"
              variant="outlined"
              fullWidth={true}
              helperText="Video URL"
              id="video"
              error={error.video}
              helperText={error.video ? "Must be a valid URL" : "Video URL"}
              value={options.video || ""}
              onChange={handleOptionsChange}
            />
          </div>
          <CustomizeButton type="submit" variant="contained" color="primary">
            Set Customization
          </CustomizeButton>
        </FormContainer>
      </Wrapper>
    </form>
  );
}
