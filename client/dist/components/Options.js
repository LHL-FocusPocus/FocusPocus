var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { createContext } from "react";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import TopBlacklisted from "./TopBlacklisted";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Customization from "./Customization";
import Blacklisted from "./Blacklisted";
import QuotaSlider from "./QuotaSlider";
import Navbar from "./Navbar";
export var CardContext = createContext({});
var Container = styled(Box)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 2em;\n  padding-top: 3em;\n  display: flex;\n  justify-content: space-around;\n  @media (max-width: 1300px) {\n    flex-direction: column;\n  }\n"], ["\n  padding: 2em;\n  padding-top: 3em;\n  display: flex;\n  justify-content: space-around;\n  @media (max-width: 1300px) {\n    flex-direction: column;\n  }\n"])));
var QuotaAndCustomization = styled(Box)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  justify-content: flex-start;\n  flex-direction: column;\n  align-items: center;\n  flex: 1;\n\n  @media (max-width: 1300px) {\n    order: 3;\n  }\n"], ["\n  display: flex;\n  justify-content: flex-start;\n  flex-direction: column;\n  align-items: center;\n  flex: 1;\n\n  @media (max-width: 1300px) {\n    order: 3;\n  }\n"])));
var theme = createMuiTheme({
    typography: {
        fontFamily: "Raleway, sans-serif",
        fontSize: 15,
    },
});
export default function Options(_a) {
    var blacklisted = _a.blacklisted, addBlacklistedSite = _a.addBlacklistedSite, disableBlacklistedSite = _a.disableBlacklistedSite, changeQuota = _a.changeQuota, dashboardData = _a.dashboardData, setDashboard = _a.setDashboard;
    var quota_today = dashboardData.quota_today, topBlacklisted = dashboardData.topBlacklisted, user = dashboardData.user;
    var addTopSiteToUserBlacklist = function (hostname) {
        addBlacklistedSite(hostname);
    };
    return (React.createElement(DndProvider, { backend: Backend },
        React.createElement(CardContext.Provider, { value: { addTopSiteToUserBlacklist: addTopSiteToUserBlacklist } },
            React.createElement(Navbar, { user: user, quota: quota_today, setDashboard: setDashboard }),
            React.createElement(ThemeProvider, { theme: theme },
                React.createElement(Container, { bgcolor: "background.paper" },
                    React.createElement(QuotaAndCustomization, null,
                        quota_today && (React.createElement(QuotaSlider, { quota: quota_today, changeQuota: changeQuota, options: user.options })),
                        React.createElement(Customization, { userOptions: user.options })),
                    React.createElement(Blacklisted, { addBlacklistedSite: addBlacklistedSite, disableBlacklistedSite: disableBlacklistedSite, blacklisted: blacklisted }),
                    React.createElement(TopBlacklisted, { topBlacklisted: topBlacklisted }))))));
}
var templateObject_1, templateObject_2;
//# sourceMappingURL=Options.js.map