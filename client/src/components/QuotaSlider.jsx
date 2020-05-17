import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import useFormFields from "../hooks/useFormFields";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

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

const DailyAdjuster = styled.div`
  width: 100%;
  text-align: center;
  padding: 0.5em;
`;

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function QuotaSlider({ quota, changeQuota }) {
  const classes = useStyles();

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
          <DailyAdjuster>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel htmlFor="filled-age-native-simple">Age</InputLabel>
              <Select
                          disabled={disabled}

                native
                // value={state.age}
                // onChange={handleChange}
                inputProps={{
                  name: "age",
                  id: "filled-age-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </Select>
            </FormControl>
          </DailyAdjuster>
          <DailyAdjuster>
            {disabled && (
              <Button
                onClick={() => setDisabled(!disabled)}
                variant="contained"
              >
                Change Quota
              </Button>
            )}
            {!disabled && (
              <Button onClick={handleSubmit} variant="contained">
                Set New Quota
              </Button>
            )}
          </DailyAdjuster>
        </SliderComponent>
      </SliderDiv>
    </>
  );
}
