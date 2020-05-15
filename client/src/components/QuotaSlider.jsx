import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import useFormFields from "../hooks/useFormFields";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

const SliderDiv = styled.div`
  width: 400px;
`;

const Spinner = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -10;
  margin-left: -12;
`;

export default function QuotaSlider({ quota }) {
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(quota.allotment);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function valuetext(value) {
    return `${value} minutes`;
  }

  const handleSubmit = event => {
    event.preventDefault();

    const quotaInMinutes = valuetext(value);

    axios
      .put("/api/user/adjust_quota", { quotaInMinutes })
      .then(res => {
        console.log("res", res);
      })
      .catch(e => {
        console.error(e);
      });

    setDisabled(!disabled);
  };

  if (!quota || quota.allotment == undefined) {
    setLoading(true);
    return <Spinner size={24} />;
  }
  setLoading(false);

  return (
    <SliderDiv>
      <Typography id="discrete-slider" gutterBottom>
        Daily Quota (Minutes)
      </Typography>
      <Slider
        // defaultValue={value}
        value={value}
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
