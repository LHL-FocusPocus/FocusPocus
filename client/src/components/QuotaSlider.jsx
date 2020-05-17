import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import Popover from "@material-ui/core/Popover";

const SliderDiv = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 5em;
  ${"" /* flex-direction: column; */}
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
  ${"" /* width: 100%; */}
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

export default function QuotaSlider({ quota, changeQuota }) {
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dailyQuota, setQuota] = useState(quota.allotment.minutes);
  const [targetQuota, setTargetQuota] = useState();

  const classes = useStyles();

  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

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
              <InputLabel htmlFor="filled-age-native-simple">
                Reduction/day
              </InputLabel>
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
                <option aria-label="Daily-Change" value="" />
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
              </Select>
            </FormControl>
            <Popup>
              <IconButton
                aria-owns={open ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                aria-label={`test`}
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
                  vertical: "right",
                  horizontal: "left",
                  // vert: bot cen top
                  // hor:  left right center
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                <Typography>
                  How much your quota will decrease per day (minutes) until target
                  quota reached
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
        </SliderComponent>
      </SliderDiv>
    </>
  );
}
