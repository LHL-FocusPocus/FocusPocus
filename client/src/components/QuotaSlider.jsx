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
  flex-direction: column;
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
  console.log("quota SLIDER", quota);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(true);

  const [dailyQuota, setQuota] = useState(quota.allotment.minutes);
  const [targetQuota, setTargetQuota] = useState();

  const handleSubmit = event => {
    event.preventDefault();
    console.log("quota", dailyQuota);
    changeQuota(dailyQuota);
    setDisabled(true);
  };

  // Use useEffect to update value when quota.allotment.minutes initializes
  useEffect(() => {
    setQuota(quota.allotment.minutes);
  }, [quota.allotment.minutes]);

  return (
    <>
      {/* {!quota.allotment && <Spinner size={24} />} */}
      <SliderDiv>
        <SliderComponent>
          <Typography id="Daily-Quota" gutterBottom>
            Daily Quota (Minutes)
          </Typography>
          <Slider
            // defaultValue={quota.allotment.minutes}
            value={dailyQuota}
            aria-labelledby="Daily-Quota"
            valueLabelDisplay="auto"
            // getAriaValueText={valuetext}
            step={10}
            marks
            min={0}
            max={180}
            disabled={disabled}
            onChange={(e, dailyQuota) => setQuota(dailyQuota)}
          />
          <SliderComponent>
            <Typography id="Target-Quota" gutterBottom>
              Target Quota
            </Typography>
            <Slider
              // defaultValue={quota.allotment.minutes}
              value={targetQuota}
              aria-labelledby="Target-Quota"
              valueLabelDisplay="auto"
              // getAriaValueText={valuetext}
              step={10}
              marks
              min={0}
              max={180}
              disabled={disabled}
              onChange={(e, targetQuota) => setTargetQuota(targetQuota)}
            />
          </SliderComponent>
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
