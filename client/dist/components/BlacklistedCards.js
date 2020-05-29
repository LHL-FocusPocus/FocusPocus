var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React from "react";
import styled from "styled-components";
import DeleteIcon from "@material-ui/icons/Delete";
import { Card, CardHeader, Avatar, IconButton } from "@material-ui/core";
var Logo = styled(Avatar)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height: 60px;\n  width: 60px;\n"], ["\n  height: 60px;\n  width: 60px;\n"])));
var Container = styled(Card)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  max-width: 345;\n  text-align: center;\n"], ["\n  max-width: 345;\n  text-align: center;\n"])));
var Delete = styled(IconButton)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  margin-top: 27%;\n  margin-right: 20%;\n"], ["\n  margin-top: 27%;\n  margin-right: 20%;\n"])));
export default function BlacklistedCards(_a) {
    var hostname = _a.hostname, name = _a.name, deleteSite = _a.deleteSite, id = _a.id;
    return (React.createElement(Container, null,
        React.createElement(CardHeader, { avatar: React.createElement(Logo, { "aria-label": "logo", src: "//logo.clearbit.com/" + hostname }), titleTypographyProps: { variant: "h5" }, title: "" + name, style: { paddingRight: "40px" }, action: React.createElement(Delete, { onClick: function () { return deleteSite(id); }, "aria-label": "Delete" },
                React.createElement(DeleteIcon, null)) })));
}
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=BlacklistedCards.js.map