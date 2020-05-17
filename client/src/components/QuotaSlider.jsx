import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import useFormFields from "../hooks/useFormFields";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

const SliderDiv = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding-top: 2em;
`;

const SliderComponent = styled.div`
  max-width: 400px;
  flex: 1;
`;

const Spinner = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -10;
  margin-left: -12;
`;

export default function QuotaSlider({ quota, changeQuota }) {
  // console.log("quota SLIDER", quota);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(true);

  const [value, setValue] = useState(quota.allotment.minutes);

  const handleSubmit = event => {
    event.preventDefault();
    // console.log("value", value);
    changeQuota(value);
    setDisabled(true);
  };

  // Use useEffect to update value when quota.allotment.minutes initializes
  useEffect(() => {
    setValue(quota.allotment.minutes);
  }, [quota.allotment.minutes]);

  return (
    <>
      {/* {!quota.allotment && <Spinner size={24} />} */}
      <SliderDiv>
        <SliderComponent>
          <Typography id="discrete-slider" gutterBottom>
            Daily Quota (Minutes)
          </Typography>
          <Slider
            // defaultValue={quota.allotment.minutes}
            value={value}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            // getAriaValueText={valuetext}
            step={10}
            marks
            min={0}
            max={180}
            disabled={disabled}
            onChange={(e, value) => setValue(value)}
          />
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
        </SliderComponent>
      </SliderDiv>
    </>
  );
}