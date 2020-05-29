var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { GridListTileBar, GridListTile } from "@material-ui/core";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../utils/constants";
import clsx from "clsx";
var useStyles = makeStyles(function (theme) { return ({
    title: {
        color: theme.palette.common.black,
    },
    notDragging: {
        opacity: 1,
    },
    dragging: {
        opacity: 0,
        boxShadow: "none",
    },
}); });
var WebsiteTitle = styled(GridListTileBar)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  text-align: center;\n  background: none;\n"], ["\n  text-align: center;\n  background: none;\n"])));
var Icon = styled.img(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  border-radius: 100%;\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n  width: 37%;\n"], ["\n  border-radius: 100%;\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n  width: 37%;\n"])));
var Card = styled(GridListTile)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  margin: 0.5em;\n  padding-top: 1em;\n  box-shadow: 1px 1px 5px slategrey;\n  flex-grow: 1;\n"], ["\n  margin: 0.5em;\n  padding-top: 1em;\n  box-shadow: 1px 1px 5px slategrey;\n  flex-grow: 1;\n"])));
export default function TopBlacklistCards(_a) {
    var _b, _c, _d;
    var hostname = _a.hostname, name = _a.name, id = _a.id;
    var classes = useStyles();
    var _e = useDrag({
        // Here is where you identify WHICH piece is being dragged
        item: { type: ItemTypes.CARD, hostname: hostname },
        // Transforms state from DnD system into usable props for component
        collect: function (monitor) { return ({
            isDragging: !!monitor.isDragging(),
        }); },
    }), isDragging = _e[0].isDragging, drag = _e[1];
    return (React.createElement(Card, { className: clsx((_b = {},
            _b[classes.dragging] = isDragging,
            _b)), key: name, ref: drag },
        React.createElement(Icon, { className: clsx((_c = {},
                _c[classes.dragging] = isDragging,
                _c[classes.image] = true,
                _c)), src: "//logo.clearbit.com/" + hostname, alt: name }),
        React.createElement(WebsiteTitle, { className: clsx((_d = {},
                _d[classes.dragging] = isDragging,
                _d)), classes: {
                title: classes.title,
            }, title: name })));
}
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=TopBlacklistCards.js.map