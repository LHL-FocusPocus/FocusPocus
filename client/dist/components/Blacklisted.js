var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import * as React from "react";
import { useState, useContext } from "react";
import BlacklistedCards from "./BlacklistedCards";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { FormControl, Collapse, CardContent, CardActionArea, CardHeader, Card, Box, Input, InputLabel, InputAdornment, Fab, } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import LanguageIcon from "@material-ui/icons/Language";
import useFormFields from "../hooks/useFormFields";
import removeProtocol from "../helpers/removeProtocol";
import { ItemTypes } from "../utils/constants";
import { CardContext } from "./Options";
import { useDrop } from "react-dnd";
import isUrl from "../helpers/isUrl";
var Container = styled(Box)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  min-height: 86vh;\n  padding: 0 1% 0 2%;\n  width: 25%;\n  padding-top: 20px;\n  flex: 1;\n\n  @media (max-width: 1300px) {\n    flex: 1 100%;\n    order: -1;\n    width: 80%;\n    justify-content: center;\n    margin: auto;\n    margin-bottom: 3em;\n  }\n"], ["\n  min-height: 86vh;\n  padding: 0 1% 0 2%;\n  width: 25%;\n  padding-top: 20px;\n  flex: 1;\n\n  @media (max-width: 1300px) {\n    flex: 1 100%;\n    order: -1;\n    width: 80%;\n    justify-content: center;\n    margin: auto;\n    margin-bottom: 3em;\n  }\n"])));
var AddNew = styled(Card)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  text-align: center;\n  width: 100%;\n"], ["\n  text-align: center;\n  width: 100%;\n"])));
var Background = styled(CardActionArea)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  background-color: rgba(71, 65, 87, 0.055);\n  width: 100%;\n"], ["\n  background-color: rgba(71, 65, 87, 0.055);\n  width: 100%;\n"])));
var Add = styled(Fab)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  margin: 5% 20%;\n"], ["\n  margin: 5% 20%;\n"])));
var Form = styled.form(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  width: 100%;\n  padding: 0;\n"], ["\n  width: 100%;\n  padding: 0;\n"])));
var Title = styled.h1(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  text-align: center;\n  margin-top: 0;\n  transform: translateY(-20%);\n  font-size: 3em;\n"], ["\n  text-align: center;\n  margin-top: 0;\n  transform: translateY(-20%);\n  font-size: 3em;\n"])));
var useStyles = makeStyles(function (theme) { return ({
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    border: {
        boxShadow: "5px 5px 15px black",
        transform: "scaleY(1.02) scaleX(1.02)",
    },
    regular: {
        border: "3x solid transparent",
        borderImageSlice: 1,
    },
    fullwidth: { width: "100%" },
    inputwidth: { width: "55%", fontSize: 25 },
}); });
export default function Blacklisted(_a) {
    var blacklisted = _a.blacklisted, disableBlacklistedSite = _a.disableBlacklistedSite, addBlacklistedSite = _a.addBlacklistedSite;
    var classes = useStyles();
    var _b = useState(false), expanded = _b[0], setExpanded = _b[1];
    var addTopSiteToUserBlacklist = useContext(CardContext).addTopSiteToUserBlacklist;
    var _c = useState(false), error = _c[0], setError = _c[1];
    // To expand blacklist Add Site button
    var handleExpandClick = function () {
        setExpanded(!expanded);
    };
    var _d = useFormFields({
        host_name: "",
    }), fields = _d[0], handleFieldChange = _d[1];
    var handleSubmit = function (event) {
        event.preventDefault();
        // Do initial check using regex
        if (!isUrl(fields.host_name)) {
            return setError(true);
        }
        var inputUrl;
        // Check if input can be constructed into URL -> if not, setError (not in correct format)
        try {
            inputUrl = fields.host_name;
            if (!inputUrl.startsWith("http")) {
                // isUrl will say true if people forget to add http, but new URL needs http
                inputUrl = "http://" + inputUrl;
            }
            new URL(inputUrl);
        }
        catch (_a) {
            return setError(true);
        }
        setError(false);
        // Remove "http://" & "https://"
        var withoutProtocol = removeProtocol(inputUrl);
        // Add blacklisted site to user db
        addBlacklistedSite(withoutProtocol);
    };
    // React Drag and Drop
    // isOver -> if dragged element is over the droppable element
    var _e = useDrop({
        // Drop accepts only type CARD
        accept: ItemTypes.CARD,
        // On drop, add site to user blacklist
        drop: function (item, monitor) { return addTopSiteToUserBlacklist(item.hostname); },
        collect: function (monitor) { return ({
            isOver: !!monitor.isOver(),
        }); },
    }), isOver = _e[0].isOver, drop = _e[1];
    // List of user's blacklisted sites
    var blacklistList = blacklisted.map(function (website) {
        return (React.createElement(BlacklistedCards, { deleteSite: disableBlacklistedSite, key: website.website_id, hostname: website.hostname, name: website.name, id: website.website_id }));
    });
    return (React.createElement(Container, { ref: drop, style: true },
        React.createElement(Title, null, "Blacklist"),
        React.createElement(AddNew, null,
            React.createElement(Background, null,
                React.createElement(CardHeader, { titleTypographyProps: { variant: "h5" }, title: "Add Site", onClick: handleExpandClick, "aria-expanded": expanded, "aria-label": "Add Site" })),
            React.createElement(Collapse, { in: expanded, timeout: "auto", unmountOnExit: true },
                React.createElement(CardContent, null,
                    React.createElement(FormControl, { className: classes.fullwidth },
                        React.createElement(Form, { className: classes.fullwidth, onSubmit: function (e) { return handleSubmit(e); } },
                            React.createElement(InputLabel, { htmlFor: "New Website" }),
                            React.createElement(Input, { className: classes.inputwidth, error: error, helperText: error ? "Must be a valid URL" : "URL", required: true, id: "host_name", value: fields.host_name, onChange: handleFieldChange, startAdornment: React.createElement(InputAdornment, { position: "start" },
                                    React.createElement(LanguageIcon, null)) }),
                            React.createElement(Add, { type: "submit", size: "small", color: "primary", "aria-label": "add" },
                                React.createElement(AddIcon, null))))))),
        React.createElement("div", { className: isOver ? classes.border : "regular" }, blacklistList)));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=Blacklisted.js.map