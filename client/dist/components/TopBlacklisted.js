var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { Typography, Popover, IconButton, GridList } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import TopBlacklistCards from "./TopBlacklistCards";
var useStyles = makeStyles(function (theme) { return ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        height: 600,
        width: 350,
        alignSelf: "center",
    },
    popover: {
        pointerEvents: "none",
    },
    paper: {
        padding: theme.spacing(1),
    },
}); });
var Title = styled.h1(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  font-size: 2em;\n  text-align: center;\n"], ["\n  font-size: 2em;\n  text-align: center;\n"])));
var Popup = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  text-align: center;\n  margin-bottom: 1em;\n"], ["\n  text-align: center;\n  margin-bottom: 1em;\n"])));
var Container = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  flex-wrap: wrap;\n  flex-direction: column;\n  overflow: hidden;\n  flex: 1;\n\n  @media (max-width: 1300px) {\n    order: 2;\n    margin-bottom: 3em;\n  }\n"], ["\n  display: flex;\n  flex-wrap: wrap;\n  flex-direction: column;\n  overflow: hidden;\n  flex: 1;\n\n  @media (max-width: 1300px) {\n    order: 2;\n    margin-bottom: 3em;\n  }\n"])));
export default function TopBlacklisted(_a) {
    var topBlacklisted = _a.topBlacklisted;
    var _b = useState(null), anchorEl = _b[0], setAnchorEl = _b[1];
    var classes = useStyles();
    var handlePopoverOpen = function (event) {
        setAnchorEl(event.currentTarget);
    };
    var handlePopoverClose = function () {
        setAnchorEl(null);
    };
    var open = Boolean(anchorEl);
    return (React.createElement(Container, { className: classes.root },
        React.createElement(Title, null, "Top Blacklisted Sites"),
        React.createElement(Popup, null,
            React.createElement(IconButton, { "aria-owns": open ? "mouse-over-popover" : undefined, "aria-haspopup": "true", onMouseEnter: handlePopoverOpen, onMouseLeave: handlePopoverClose, "aria-label": "test" },
                React.createElement(InfoIcon, null)),
            React.createElement(Popover, { id: "mouse-over-popover", className: classes.popover, classes: {
                    paper: classes.paper,
                }, open: open, anchorEl: anchorEl, anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "center",
                }, transformOrigin: {
                    vertical: "top",
                    horizontal: "center",
                }, onClose: handlePopoverClose, disableRestoreFocus: true },
                React.createElement(Typography, null, "Drag and Drop to Blacklist"))),
        React.createElement(GridList, { cellHeight: 180, className: classes.gridList }, topBlacklisted.map(function (tile) { return (React.createElement(TopBlacklistCards, { className: classes.cards, key: tile.id, hostname: tile.hostname, name: tile.name })); }))));
}
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=TopBlacklisted.js.map