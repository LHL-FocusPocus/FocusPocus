import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import styled from "styled-components";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Wrapper = styled(Box)`
  display: flex;
`;

const ButtonContainer = styled(Box)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const CustomizeButton = styled(Button)`
  align-item: center;
`

export default function FormPropsTextFields() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Wrapper>
        <FormContainer>
          <div>
            <TextField
              id="outlined-required"
              label="Word"
              // defaultValue="SNAKE"
              variant="outlined"
            />

            <TextField
              id="outlined-read-only-input"
              label="Image"
              // defaultValue="Hello World"
              variant="outlined"
              helperText="URL"
            />
            <TextField
              id="video"
              label="Video"
              variant="outlined"
              helperText="URL"
            />
          </div>
        </FormContainer>
        <ButtonContainer>
          <CustomizeButton variant="contained" color="primary">
            Customize
          </CustomizeButton>
        </ButtonContainer>
      </Wrapper>
    </form>
  );
}
