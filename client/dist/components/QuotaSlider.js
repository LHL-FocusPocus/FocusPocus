var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { Select, InputLabel, FormControl, IconButton, Popover, Typography, Slider, Button, } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import { Alert } from "@material-ui/lab";
var Title = styled.h1(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  font-size: 2em;\n  text-align: center;\n"], ["\n  font-size: 2em;\n  text-align: center;\n"])));
var SliderDiv = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  margin-top: 0.5em;\n  margin-bottom: 2em;\n  width: 70%;\n"], ["\n  display: flex;\n  justify-content: center;\n  margin-top: 0.5em;\n  margin-bottom: 2em;\n  width: 70%;\n"])));
var SliderComponent = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  max-width: 400px;\n  flex: 1;\n"], ["\n  max-width: 400px;\n  flex: 1;\n"])));
var DailyAdjuster = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  padding: 0.5em;\n  display: flex;\n  justify-content: center;\n"], ["\n  padding: 0.5em;\n  display: flex;\n  justify-content: center;\n"])));
var QuotaButton = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  width: 100%;\n  text-align: center;\n"], ["\n  width: 100%;\n  text-align: center;\n"])));
var Popup = styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  margin-top: 3%;\n"], ["\n  margin-top: 3%;\n"])));
var useStyles = makeStyles(function (theme) { return ({
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
}); });
export default function QuotaSlider(_a) {
    var quota = _a.quota, changeQuota = _a.changeQuota, options = _a.options;
    // Controlled Component
    var _b = useState(true), disabled = _b[0], setDisabled = _b[1];
    var _c = useState(null), anchorEl = _c[0], setAnchorEl = _c[1];
    var _d = useState(quota.allotment.minutes), dailyQuota = _d[0], setQuota = _d[1];
    var _e = useState(0), targetQuota = _e[0], setTargetQuota = _e[1];
    var _f = useState(5), increment = _f[0], setIncrement = _f[1];
    var _g = useState(false), error = _g[0], setError = _g[1];
    // Show Target Quota if increment is higher than static, otherwise hide Target Quota
    var _h = useState(options.quotaIncrement > 0 || false), targetQuotaShow = _h[0], setTargetQuotaShow = _h[1];
    var classes = useStyles();
    // Handle mouse over popovers
    var handlePopoverOpen = function (event) {
        setAnchorEl(event.currentTarget);
    };
    var handlePopoverClose = function () {
        setAnchorEl(null);
    };
    // Only show Target Quota slider when increment value is higher than "static"
    var handleShowTargetQuota = function (value) {
        value > 0 ? setTargetQuotaShow(true) : setTargetQuotaShow(false);
    };
    var open = Boolean(anchorEl);
    var handleSubmit = function (event) {
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
    useEffect(function () {
        setQuota(quota.allotment.minutes);
    }, [quota.allotment.minutes]);
    useEffect(function () {
        setTargetQuota(options.quotaTarget);
    }, [options.quotaTarget]);
    useEffect(function () {
        setIncrement(options.quotaIncrement);
    }, [options.quotaIncrement]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Title, null, "Adjust Your Quota"),
        React.createElement(SliderDiv, null,
            React.createElement(SliderComponent, null,
                React.createElement(Typography, { id: "Daily-Quota", gutterBottom: true }, "Daily Quota (Minutes)"),
                React.createElement(Slider, { value: dailyQuota, "aria-labelledby": "Daily-Quota", valueLabelDisplay: "auto", step: 10, marks: true, min: 0, max: 180, disabled: disabled, onChange: function (e, dailyQuota) { return setQuota(dailyQuota); } }),
                targetQuotaShow && (React.createElement(SliderComponent, null,
                    React.createElement(Typography, { id: "Target-Quota", gutterBottom: true }, "Target Quota (Minutes)"),
                    React.createElement(Slider, { value: targetQuota, "aria-labelledby": "Target-Quota", valueLabelDisplay: "auto", step: 10, marks: true, min: 0, max: 180, disabled: disabled, onChange: function (e, targetQuota) { return setTargetQuota(targetQuota); } }))),
                React.createElement(DailyAdjuster, null,
                    React.createElement(FormControl, { variant: "filled", className: classes.formControl },
                        React.createElement(InputLabel, null, "Reduction per day"),
                        React.createElement(Select, { disabled: disabled, native: true, value: increment, onChange: function (e) {
                                setIncrement(e.target.value);
                                handleShowTargetQuota(e.target.value);
                            } },
                            React.createElement("option", { value: 0 }, "Static"),
                            React.createElement("option", { value: 1 }, "1 minute"),
                            React.createElement("option", { value: 2 }, "2 minutes"),
                            React.createElement("option", { value: 3 }, "3 minutes"),
                            React.createElement("option", { value: 4 }, "4 minutes"),
                            React.createElement("option", { value: 5 }, "5 minutes"),
                            React.createElement("option", { value: 6 }, "6 minutes"),
                            React.createElement("option", { value: 7 }, "7 minutes"),
                            React.createElement("option", { value: 8 }, "8 minutes"),
                            React.createElement("option", { value: 9 }, "9 minutes"),
                            React.createElement("option", { value: 10 }, "10 minutes"))),
                    React.createElement(Popup, null,
                        React.createElement(IconButton, { "aria-owns": open ? "mouse-over-popover" : undefined, "aria-haspopup": "true", onMouseEnter: handlePopoverOpen, onMouseLeave: handlePopoverClose, "aria-label": "Increment Info" },
                            React.createElement(InfoIcon, null)),
                        React.createElement(Popover, { id: "mouse-over-popover", className: classes.popover, classes: {
                                paper: classes.paper,
                            }, open: open, anchorEl: anchorEl, anchorOrigin: {
                                vertical: "center",
                                horizontal: "right",
                            }, transformOrigin: {
                                vertical: "top",
                                horizontal: "left",
                            }, onClose: handlePopoverClose, disableRestoreFocus: true },
                            React.createElement(Typography, null, "How much your quota will decrease per day until your target quota is reached")))),
                React.createElement(QuotaButton, null,
                    disabled && (React.createElement(Button, { fullWidth: true, onClick: function () { return setDisabled(!disabled); }, variant: "contained" }, "Change Quota")),
                    !disabled && (React.createElement(Button, { fullWidth: true, onClick: handleSubmit, variant: "contained" }, "Set New Quota"))),
                error && (React.createElement(Alert, { severity: "error" }, "Target quota cannot be higher than daily quota!"))))));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=QuotaSlider.js.map