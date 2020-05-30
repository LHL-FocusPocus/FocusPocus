import React, { useState } from "react";
import { Box, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFormFields from "../hooks/useFormFields";
import axios from "axios";

interface Props {
  userOptions: {
    noun: string;
    imageUrl: string;
    videoUrl: string;
  };
}

interface ErrorState {
  image?: boolean;
  video?: boolean;
}

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
  toast: { fontSize: 25 },
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
  padding-right: 0.7em;
`;
const PaddedTextField = styled(TextField)`
  margin: 0.5em;
`;

const CustomizeButton = styled(Button)`
  width: 100%;
  margin: 0.5em;
`;

export default function Customization({ userOptions }: Props) {
  const classes = useStyles();
  const [options, handleOptionsChange] = useFormFields({
    word: userOptions.noun,
    image: userOptions.imageUrl,
    video: userOptions.videoUrl,
  });
  
  const [error, setError] = useState({
    image: false,
    video: false,
  } as ErrorState);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    // Check if input can be constructed into URL -> if not, setError (not in correct URL format that the extension requires)
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
      .then(() => {
        toast("✔️ Customizations Set!", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          className: classes.toast,
        });
      })
      .catch(e => {
        console.error(e);
        toast.error("⚠️ Customzations NOT set! Please try again. ⚠️", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
      <ToastContainer style={{ marginLeft: "8.2%" }} />
    </form>
  );
}
