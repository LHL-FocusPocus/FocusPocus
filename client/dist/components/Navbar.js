var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Divider, Drawer, Button, List, ListItem, ListItemIcon, ListItemText, Avatar, Box, } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import AssessmentIcon from "@material-ui/icons/Assessment";
import ExtensionIcon from "@material-ui/icons/Extension";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import { useHistory } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import formatNavbarText from "../helpers/formatNavbarText";
import axios from "axios";
var useStyles = makeStyles(function (theme) { return ({
    button: {
        transform: "translateY(-60%) translateX(73%)",
        borderRadius: "100%",
    },
    anchor: { textDecoration: "none", color: "inherit" },
}); });
var Icon = styled(Avatar)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 35%;\n  height: auto;\n  margin: auto;\n  margin-top: 1em;\n  box-shadow: 5px 19px 38px rgba(0, 0, 0, 0.3), 0 15px 38px rgba(0, 0, 0, 0.22);\n"], ["\n  width: 35%;\n  height: auto;\n  margin: auto;\n  margin-top: 1em;\n  box-shadow: 5px 19px 38px rgba(0, 0, 0, 0.3), 0 15px 38px rgba(0, 0, 0, 0.22);\n"])));
var DrawerIcon = styled(MenuOpenIcon)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: auto;\n  height: 40px;\n"], ["\n  width: auto;\n  height: 40px;\n"])));
var NavbarLogo = styled.img(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width: 260px;\n  margin-left: 49.8%;\n  margin-top: 1%;\n  transform: translateX(-180px);\n"], ["\n  width: 260px;\n  margin-left: 49.8%;\n  margin-top: 1%;\n  transform: translateX(-180px);\n"])));
var Greeting = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  text-align: center;\n  padding: 1em;\n  font-size: 1.5em;\n"], ["\n  text-align: center;\n  padding: 1em;\n  font-size: 1.5em;\n"])));
var Logo = styled.img(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  width: 70%;\n  margin: 2em auto;\n"], ["\n  width: 70%;\n  margin: 2em auto;\n"])));
var LogoContainer = styled(Box)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  background-image: url(\"imgs/landing-bg.png\");\n  background-size: cover;\n  text-align: center;\n  box-shadow: 0 8px 20px -6px slategrey;\n"], ["\n  background-image: url(\"imgs/landing-bg.png\");\n  background-size: cover;\n  text-align: center;\n  box-shadow: 0 8px 20px -6px slategrey;\n"])));
var Message = styled.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  text-align: center;\n  margin: 1.5em;\n  font-size: 1.1em;\n"], ["\n  text-align: center;\n  margin: 1.5em;\n  font-size: 1.1em;\n"])));
var QuotaMessage = styled.div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  text-align: center;\n  padding: 1.5em;\n  font-size: 0.9em;\n"], ["\n  text-align: center;\n  padding: 1.5em;\n  font-size: 0.9em;\n"])));
var QuotaTime = styled.div(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  font-size: 1.1em;\n  padding: 0.5em;\n"], ["\n  font-size: 1.1em;\n  padding: 0.5em;\n"])));
var Container = styled.div(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  display: flex;\n  flex-flow: column nowrap;\n  background: #ece9e6; /* fallback for old browsers */\n  background: -webkit-linear-gradient(\n    to right,\n    #ffffff,\n    #ece9e6\n  ); /* Chrome 10-25, Safari 5.1-6 */\n  background: linear-gradient(\n    to right,\n    #ffffff,\n    #ece9e6\n  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */\n  font-family: \"Raleway\", sans-serif;\n  height: 100%;\n  width: 350px;\n"], ["\n  display: flex;\n  flex-flow: column nowrap;\n  background: #ece9e6; /* fallback for old browsers */\n  background: -webkit-linear-gradient(\n    to right,\n    #ffffff,\n    #ece9e6\n  ); /* Chrome 10-25, Safari 5.1-6 */\n  background: linear-gradient(\n    to right,\n    #ffffff,\n    #ece9e6\n  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */\n  font-family: \"Raleway\", sans-serif;\n  height: 100%;\n  width: 350px;\n"])));
// const EXTENSION_URL = "https://github.com/LHL-FocusPocus/FocusPocus/releases"
var EXTENSION_URL = "https://chrome.google.com/webstore/detail/focus-pocus-extension/ognhkeempdpgnfkliplegljejeakonlg/";
export default function Navbar(_a) {
    var user = _a.user, quota = _a.quota, setDashboard = _a.setDashboard;
    var classes = useStyles();
    var history = useHistory();
    var first_name = user.first_name, picture = user.picture;
    var humanizeDurationOptions = {
        units: ["h", "m"],
        delimiter: " and ",
        round: true,
    };
    // Humanize time in more readable format given by quota data
    var used_quota = humanizeDuration(quota.used.minutes * 60000, humanizeDurationOptions);
    var allotment = humanizeDuration(quota.allotment.minutes * 60000, humanizeDurationOptions);
    var total_browsing = humanizeDuration(quota.all_browse_time.minutes * 60000, humanizeDurationOptions);
    var _b = useState({
        left: false,
    }), state = _b[0], setState = _b[1];
    var toggleDrawer = function (anchor, open) { return function (event) {
        var _a;
        if (event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setState(__assign(__assign({}, state), (_a = {}, _a[anchor] = open, _a)));
    }; };
    var handleLogout = function () {
        axios
            .post("/api/user/logout")
            .then(function (res) {
            setDashboard();
            history.push("/logout");
        })
            .catch(function (e) {
            console.error(e);
        });
    };
    var list = function (anchor) { return (React.createElement(Container, { role: "presentation", onClick: toggleDrawer(anchor, false), onKeyDown: toggleDrawer(anchor, false) },
        React.createElement(LogoContainer, null,
            React.createElement(Logo, { src: "imgs/logo3.png" })),
        React.createElement(List, null,
            React.createElement(Icon, { src: picture })),
        React.createElement(Greeting, null,
            "Welcome, ",
            React.createElement("strong", null, first_name),
            "!"),
        React.createElement(Message, null, formatNavbarText(quota.used.minutes, quota.allotment.minutes)),
        React.createElement(QuotaMessage, null,
            React.createElement("strong", null, "Today's Usage"),
            React.createElement(QuotaTime, null, used_quota),
            "of",
            React.createElement(QuotaTime, null, allotment)),
        React.createElement(Divider, null),
        React.createElement(List, null,
            ["Dashboard", "Options"].map(function (text, index) { return (React.createElement(ListItem, { button: true, key: text, component: Link, to: "/" + text.toLowerCase() },
                React.createElement(ListItemIcon, null, index % 2 !== 0 ? React.createElement(SettingsIcon, null) : React.createElement(AssessmentIcon, null)),
                React.createElement(ListItemText, { primary: text }))); }),
            React.createElement("a", { href: EXTENSION_URL, target: "_blank", className: classes.anchor },
                React.createElement(ListItem, { button: true, key: "extension" },
                    React.createElement(ListItemIcon, null,
                        React.createElement(ExtensionIcon, null)),
                    React.createElement(ListItemText, { primary: "Get Extension" })))),
        React.createElement(Divider, null),
        React.createElement(List, { onClick: handleLogout },
            React.createElement(ListItem, { button: true, id: "logout" },
                React.createElement(ListItemIcon, null,
                    React.createElement(PowerSettingsNewIcon, null)),
                React.createElement(ListItemText, { primary: "Log Out" }))))); };
    return (React.createElement("div", null,
        React.createElement("div", null,
            React.createElement(Button, { className: classes.button, onClick: toggleDrawer("FocusPocus", true) },
                React.createElement(DrawerIcon, null)),
            React.createElement(NavbarLogo, { src: "/imgs/logo3.png", alt: "Menu Logo" })),
        React.createElement(Drawer, { open: state["FocusPocus"], onClose: toggleDrawer("FocusPocus", false) }, list("FocusPocus"))));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
//# sourceMappingURL=Navbar.js.map