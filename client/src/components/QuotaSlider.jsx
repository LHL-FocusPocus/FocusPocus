import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

const SliderDiv = styled.div`
  width: 400px;
`;

function valuetext(value) {
  return `${value}°C`;
}

export default function DiscreteSlider() {
  const [disabled, setDisabled] = useState(true);
  return (
    <SliderDiv>
      <Typography id="discrete-slider" gutterBottom>
        Daily Quota (Minutes)
      </Typography>
      <Slider
        defaultValue={30}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        marks
        min={0}
        max={120}
        disabled={disabled}
      />
      <Button onClick={() => setDisabled(!disabled)} variant="contained">
        {disabled && "Change Quota"} {/* STRETCH: can't change again until: 7 days from now */}
        {!disabled && "Set Quota"}
      </Button>
    </SliderDiv>
  );
}

// check if account is new (?), if so, suggest they dont touch the quota slider yet
