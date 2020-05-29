var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React from "react";
import styled from "styled-components";
import { useHistory, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import LogoText from "./LogoText";
import GitHubIcon from "@material-ui/icons/GitHub";
import { IconButton } from "@material-ui/core";
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  height: 100vh;\n\n  @media (max-width: 1300px) {\n    flex-direction: column;\n    height: auto;\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  height: 100vh;\n\n  @media (max-width: 1300px) {\n    flex-direction: column;\n    height: auto;\n  }\n"])));
var GitHub = styled(IconButton)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: fixed !important;\n  left: 0.8em !important;\n  top: 0.6em !important;\n\n  @media (max-width: 1300px) {\n    left: 0.2em !important;\n  top: 0.2em !important;\n  }\n"], ["\n  position: fixed !important;\n  left: 0.8em !important;\n  top: 0.6em !important;\n\n  @media (max-width: 1300px) {\n    left: 0.2em !important;\n  top: 0.2em !important;\n  }\n"])));
export default function Landing(_a) {
    var setDashboard = _a.setDashboard;
    var history = useHistory();
    return (React.createElement(Container, null,
        React.createElement(GitHub, { href: "https://github.com/LHL-FocusPocus/FocusPocus" },
            React.createElement(GitHubIcon, { style: { maxWidth: 35 } })),
        React.createElement(LogoText, null),
        React.createElement(Route, { exact: true, path: ["/login", "/logout"], render: function () { return React.createElement(Login, { setDashboard: setDashboard, history: history }); } }),
        React.createElement(Route, { exact: true, path: "/register", render: function () { return React.createElement(SignUp, { setDashboard: setDashboard, history: history }); } })));
}
var templateObject_1, templateObject_2;
//# sourceMappingURL=Landing.js.map