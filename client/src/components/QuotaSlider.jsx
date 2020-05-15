import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import useFormFields from "../hooks/useFormFields";
import axios from "axios";

const SliderDiv = styled.div`
  width: 400px;
`;

export default function DiscreteSlider() {
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState(120);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log("valuetext", valuetext(value));
  };

  function valuetext(value) {
    return `${value} minutes/day`;
  }

  // const handleSubmit = event => {
  //   event.preventDefault();
  //   console.log("test");

  //   axios
  //     .post("/api/user/adjust_quota", value, { withCredentials: true })
  //     .then((res) => {
  //       console.log('res', res)
  //     })
  //     .catch(e => {
  //       console.error(e);
  //     });

  //   setDisabled(!disabled);
  // };

  return (
    <SliderDiv>
      <Typography id="discrete-slider" gutterBottom>
        Daily Quota (Minutes)
      </Typography>
      <Slider
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        step={10}
        marks
        min={0}
        max={180}
        disabled={disabled}
        onChange={handleChange}
      />
      {/* STRETCH: can't change again until: 7 days from now */}
      {disabled && (
        <Button onClick={() => setDisabled(!disabled)} variant="contained">
          Change Quota
        </Button>
      )}
      {!disabled && (
        <Button onClick={handleSubmit} variant="contained">
          Set New Quota
        </Button>
      )}
    </SliderDiv>
  );
}

// check if account is new (?), if so, suggest they dont touch the quota slider yet
