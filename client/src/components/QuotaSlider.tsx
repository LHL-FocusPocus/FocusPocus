import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import {
  Select,
  InputLabel,
  FormControl,
  IconButton,
  Popover,
  Typography,
  Slider,
  Button,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import { Alert } from "@material-ui/lab";
import { QuotaData, OptionsData } from "../helpers/interfaces";

interface Props {
  options: OptionsData;
  changeQuota: any;
  quota: QuotaData;
}

const Title = styled.h1`
  font-size: 2em;
  text-align: center;
`;

const SliderDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.5em;
  margin-bottom: 2em;
  width: 70%;
`;

const SliderComponent = styled.div`
  max-width: 400px;
  flex: 1;
`;

const DailyAdjuster = styled.div`
  padding: 0.5em;
  display: flex;
  justify-content: center;
`;

const QuotaButton = styled.div`
  width: 100%;
  text-align: center;
`;

const Popup = styled.div`
  margin-top: 3%;
`;

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 160,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

export default function QuotaSlider({ quota, changeQuota, options }: Props) {
  // Controlled Component
  const [disabled, setDisabled] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dailyQuota, setQuota] = useState(quota.allotment.minutes);
  const [targetQuota, setTargetQuota] = useState(0);
  const [increment, setIncrement] = useState(5);
  const [error, setError] = useState(false);
  // Show Target Quota if increment is higher than static, otherwise hide Target Quota
  const [targetQuotaShow, setTargetQuotaShow] = useState(
    options.quotaIncrement > 0 || false
  );

  const classes = useStyles();

  // Handle mouse over popovers
  const handlePopoverOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  // Only show Target Quota slider when increment value is higher than "static"
  const handleShowTargetQuota = (value: number) => {
    value > 0 ? setTargetQuotaShow(true) : setTargetQuotaShow(false);
  };

  const open = Boolean(anchorEl);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Target Quota cannot be higher than daily quota
    // Number(increment) !== 0 is necessary because this target CAN be higher than daily if the increment is static
    if (targetQuota > dailyQuota && Number(increment) !== 0) {
      return setError(true);
    }
    // Increment is initially a string value -> must be converted
    changeQuota(dailyQuota, targetQuota, Number(increment));
    setError(false);
    setDisabled(true);
  };

  // Use useEffect to update value when quota & options initialize
  useEffect(() => {
    setQuota(quota.allotment.minutes);
  }, [quota.allotment.minutes]);

  useEffect(() => {
    setTargetQuota(options.quotaTarget);
  }, [options.quotaTarget]);

  useEffect(() => {
    setIncrement(options.quotaIncrement);
  }, [options.quotaIncrement]);

  return (
    <>
      <Title>Adjust Your Quota</Title>
      <SliderDiv>
        <SliderComponent>
          <Typography id="Daily-Quota" gutterBottom>
            Daily Quota (Minutes)
          </Typography>
          <Slider
            value={dailyQuota}
            aria-labelledby="Daily-Quota"
            valueLabelDisplay="auto"
            step={10}
            marks
            min={0}
            max={180}
            disabled={disabled}
            onChange={(e, dailyQuota) => setQuota(dailyQuota as number)}
          />
          {targetQuotaShow && (
            <SliderComponent>
              <Typography id="Target-Quota" gutterBottom>
                Target Quota (Minutes)
              </Typography>
              <Slider
                value={targetQuota}
                aria-labelledby="Target-Quota"
                valueLabelDisplay="auto"
                step={10}
                marks
                min={0}
                max={180}
                disabled={disabled}
                onChange={(e, targetQuota) => setTargetQuota(targetQuota as number)}
              />
            </SliderComponent>
          )}
          <DailyAdjuster>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel>Reduction per day</InputLabel>
              <Select
                disabled={disabled}
                native
                value={increment}
                onChange={e => {
                  setIncrement(e.target.value as number);
                  handleShowTargetQuota(e.target.value as number);
                }}
              >
                <option value={0}>Static</option>
                <option value={1}>1 minute</option>
                <option value={2}>2 minutes</option>
                <option value={3}>3 minutes</option>
                <option value={4}>4 minutes</option>
                <option value={5}>5 minutes</option>
                <option value={6}>6 minutes</option>
                <option value={7}>7 minutes</option>
                <option value={8}>8 minutes</option>
                <option value={9}>9 minutes</option>
                <option value={10}>10 minutes</option>
              </Select>
            </FormControl>
            <Popup>
              <IconButton
                aria-owns={open ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                aria-label={`Increment Info`}
              >
                <InfoIcon />
              </IconButton>

              <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                  paper: classes.paper,
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                <Typography>
                  How much your quota will decrease per day until your target
                  quota is reached
                </Typography>
              </Popover>
            </Popup>
          </DailyAdjuster>
          <QuotaButton>
            {disabled && (
              <Button
                fullWidth={true}
                onClick={() => setDisabled(!disabled)}
                variant="contained"
              >
                Change Quota
              </Button>
            )}
            {!disabled && (
              <Button
                fullWidth={true}
                onClick={handleSubmit}
                variant="contained"
              >
                Set New Quota
              </Button>
            )}
          </QuotaButton>
          {error && (
            <Alert severity="error">
              Target quota cannot be higher than daily quota!
            </Alert>
          )}
        </SliderComponent>
      </SliderDiv>
    </>
  );
}
